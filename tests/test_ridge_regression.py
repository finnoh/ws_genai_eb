import unittest

import numpy as np

from ridge_regression import RidgeRegression


class RidgeRegressionTests(unittest.TestCase):
    def test_fit_sets_attributes(self) -> None:
        X = np.array([[1.0], [2.0], [3.0], [4.0]])
        y = np.array([2.0, 3.0, 4.0, 5.0])
        model = RidgeRegression(alpha=1.0)

        model.fit(X, y)

        self.assertTrue(model.is_fitted_)
        self.assertEqual(model.n_features_in_, 1)
        self.assertEqual(model.coef_.shape, (1,))
        self.assertIsInstance(model.intercept_, float)

    def test_predict_shape(self) -> None:
        X = np.array([[0.0], [1.0], [2.0], [3.0]])
        y = np.array([1.0, 3.0, 5.0, 7.0])
        model = RidgeRegression(alpha=0.1).fit(X, y)

        pred = model.predict(np.array([[4.0], [5.0]]))

        self.assertEqual(pred.shape, (2,))

    def test_closed_form_matches_manual_solution(self) -> None:
        X = np.array([[1.0, 0.0], [0.0, 1.0], [1.0, 1.0], [2.0, 1.0]])
        y = np.array([1.0, 2.0, 2.5, 4.0])
        alpha = 0.5

        model = RidgeRegression(alpha=alpha, fit_intercept=False).fit(X, y)

        expected = np.linalg.solve(X.T @ X + alpha * np.eye(2), X.T @ y)
        np.testing.assert_allclose(model.coef_, expected, rtol=1e-10, atol=1e-10)
        self.assertAlmostEqual(model.intercept_, 0.0)

    def test_alpha_zero_approximates_ols(self) -> None:
        X = np.array([[1.0], [2.0], [3.0], [4.0], [5.0]])
        y = np.array([1.1, 1.9, 3.2, 4.0, 4.8])
        model = RidgeRegression(alpha=0.0, fit_intercept=False).fit(X, y)

        expected = np.linalg.lstsq(X, y, rcond=None)[0]
        np.testing.assert_allclose(model.coef_, expected, rtol=1e-10, atol=1e-10)

    def test_larger_alpha_shrinks_coefficients(self) -> None:
        rng = np.random.default_rng(7)
        X = rng.normal(size=(60, 4))
        y = X @ np.array([2.0, -1.0, 0.5, 3.0]) + rng.normal(scale=0.2, size=60)

        small = RidgeRegression(alpha=0.01).fit(X, y)
        large = RidgeRegression(alpha=100.0).fit(X, y)

        self.assertLess(np.linalg.norm(large.coef_), np.linalg.norm(small.coef_))

    def test_predict_before_fit_raises(self) -> None:
        model = RidgeRegression(alpha=1.0)
        with self.assertRaises(RuntimeError):
            model.predict([[1.0]])

    def test_shape_mismatch_raises(self) -> None:
        model = RidgeRegression(alpha=1.0)
        X = np.array([[1.0, 2.0], [3.0, 4.0]])
        y = np.array([1.0])
        with self.assertRaises(ValueError):
            model.fit(X, y)

    def test_invalid_alpha_raises(self) -> None:
        X = np.array([[1.0], [2.0]])
        y = np.array([1.0, 2.0])

        with self.assertRaises(ValueError):
            RidgeRegression(alpha=-1.0).fit(X, y)

    def test_non_finite_data_raises(self) -> None:
        model = RidgeRegression(alpha=1.0)
        X = np.array([[1.0], [np.nan]])
        y = np.array([1.0, 2.0])
        with self.assertRaises(ValueError):
            model.fit(X, y)

    def test_feature_count_mismatch_on_predict_raises(self) -> None:
        X = np.array([[1.0, 0.0], [0.0, 1.0]])
        y = np.array([1.0, 2.0])
        model = RidgeRegression(alpha=1.0).fit(X, y)

        with self.assertRaises(ValueError):
            model.predict(np.array([[1.0]]))

    def test_score_matches_expected_r2(self) -> None:
        X = np.array([[1.0], [2.0], [3.0], [4.0]])
        y = np.array([2.0, 4.0, 6.0, 8.0])
        model = RidgeRegression(alpha=0.0).fit(X, y)

        score = model.score(X, y)
        self.assertAlmostEqual(score, 1.0, places=10)


if __name__ == "__main__":
    unittest.main()
