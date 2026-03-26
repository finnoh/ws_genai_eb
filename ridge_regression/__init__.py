"""Public API for ridge regression module."""

from .exceptions import NotFittedError, RidgeRegressionError, ValidationError
from .metrics import mean_squared_error, r2_score
from .model import RidgeRegression, RidgeRegressor

__all__ = [
    "RidgeRegressor",
    "RidgeRegression",
    "mean_squared_error",
    "r2_score",
    "RidgeRegressionError",
    "ValidationError",
    "NotFittedError",
]
