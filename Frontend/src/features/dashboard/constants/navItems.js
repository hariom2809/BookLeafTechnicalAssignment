import {
  BooksIcon,
  TicketIcon,
} from "../icons/DashboardIcons"

export const navItems = [
  {
    to: "/dashboard/my-books",
    label: "My Books",
    Icon: BooksIcon,
    description: "Your published titles",
  },
  {
    to: "/dashboard/my-tickets",
    label: "My Tickets",
    Icon: TicketIcon,
    description: "Support requests & queries",
  },
]