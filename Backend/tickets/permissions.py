from rest_framework.permissions import BasePermission


class IsAdminUser(BasePermission):
    """Allow only authenticated users whose role is admin."""

    message = "Only admins can access this endpoint."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and getattr(request.user, "role", None) == "admin"
        )
