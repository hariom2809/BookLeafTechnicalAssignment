import django_filters
from django.db.models import Q

from .models import Ticket


class TicketFilter(django_filters.FilterSet):
    status = django_filters.CharFilter(field_name="status", lookup_expr="exact")
    category = django_filters.CharFilter(method="filter_category")
    priority = django_filters.CharFilter(method="filter_priority")
    created_after = django_filters.DateFilter(field_name="created_at", lookup_expr="gte")
    created_before = django_filters.DateFilter(field_name="created_at", lookup_expr="lte")

    class Meta:
        model = Ticket
        fields = ["status", "category", "priority", "created_after", "created_before"]

    def filter_category(self, queryset, name, value):
        return queryset.filter(Q(category=value) | Q(ai_category=value))

    def filter_priority(self, queryset, name, value):
        return queryset.filter(Q(priority=value) | Q(ai_priority=value))
