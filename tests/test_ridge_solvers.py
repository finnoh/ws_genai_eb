import numpy as np

from ridge_regression.solvers import (
    solve_ridge_closed_form,
    solve_ridge_gradient_descent,
)


def test_gradient_descent_matches_closed_form() -> None:
    rng = np.random.default_rng(13)
    X = rng.normal(size=(120, 5))
    true_coef = np.array([2.0, -1.5, 0.5, 0.0, 3.0])
    y = X @ true_coef + 1.25 + rng.normal(scale=0.1, size=120)

    cf_coef, cf_intercept = solve_ridge_closed_form(X, y, alpha=1.0, fit_intercept=True)
    gd_coef, gd_intercept = solve_ridge_gradient_descent(
        X,
        y,
        alpha=1.0,
        fit_intercept=True,
        max_iter=10000,
        tol=1e-8,
        random_state=0,
    )

    np.testing.assert_allclose(gd_coef, cf_coef, rtol=5e-3, atol=5e-3)
    assert np.isclose(gd_intercept, cf_intercept, rtol=5e-3, atol=5e-3)
