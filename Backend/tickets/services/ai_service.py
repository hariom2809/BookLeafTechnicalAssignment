import json
import re

import google.generativeai as genai
from django.conf import settings


genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("models/gemma-4-26b-a4b-it")


def classify_and_prioritize(subject, description):
    prompt = f"""
    You are a ticket classification system.

    Categories:
    - royalty_and_payment
    - isbn_and_metadata_issues
    - printing_and_quality
    - distribution_and_availability
    - book_status_and_production_updates
    - general_inquery

    Priorities:
    - critical
    - high
    - medium
    - low

    Analyze the ticket and return ONLY a JSON object.

    Example:

    {{
        "category": "royalty_and_payment",
        "priority": "high"
    }}

    Do not explain.
    Do not provide reasoning.
    Do not use markdown.
    Do not wrap the response in ```json blocks.

    Ticket Subject:
    {subject}

    Ticket Description:
    {description}
    """

    response = model.generate_content(prompt)

    text = response.text.strip()

    print("\n========== GEMMA RESPONSE ==========")
    print(text)
    print("====================================\n")

    match = re.search(r"\{.*\}", text, re.DOTALL)

    if not match:
        raise ValueError(
            f"No JSON found in model response:\n{text}"
        )

    data = json.loads(match.group())

    return {
        "category": data.get("category", "general_inquery"),
        "priority": data.get("priority", "medium"),
    }

def generate_draft_response(ticket):
    prompt = f"""
    You are a Book Publishing Support Agent.

    Subject:
    {ticket.subject}

    Description:
    {ticket.description}

    Category:
    {ticket.ai_category}

    Priority:
    {ticket.ai_priority}

    Write a professional customer support response.

    Return only the response text.
    """

    response = model.generate_content(prompt)

    return response.text.strip()