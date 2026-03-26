import numpy as np

from ridge_regression.metrics import mean_squared_error, r2_score


def test_mean_squared_error_matches_manual_value() -> None:
    y_true = np.array([1.0, 2.0, 3.0])
    y_pred = np.array([1.0, 2.5, 2.0])
    assert np.isclose(mean_squared_error(y_true, y_pred), (0.0 + 0.25 + 1.0) / 3.0)


def test_r2_score_perfect_fit_is_one() -> None:
    y_true = np.array([1.0, 2.0, 3.0, 4.0])
    y_pred = np.array([1.0, 2.0, 3.0, 4.0])
    assert np.isclose(r2_score(y_true, y_pred), 1.0)
