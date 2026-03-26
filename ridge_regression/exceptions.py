"""Custom exceptions for ridge regression module."""


class RidgeRegressionError(Exception):
    """Base exception for module-specific errors."""


class ValidationError(RidgeRegressionError, ValueError):
    """Raised when user inputs or parameters are invalid."""


class NotFittedError(RidgeRegressionError, RuntimeError):
    """Raised when calling predict/score before fit."""
