/** NOTE: This MUST	be loaded for meta.js to work */

/**
 * Builds a basic cwqs element
 * @author charlie-map
 *
 * @param {string} element - new element to build
 * @returns {Node} The element that returns from the createElement method.
 */
function $gencwqs(element) {
	const newcwqs = document.createElement(element);

	newcwqs.$cwqs = $cwqs;
	newcwqs.$cwqsSafe = $cwqsSafe;
	newcwqs.$cwqsAll = $cwqsAll;

	return newcwqs;
}

/**
 * $cwqs A simple wrapper around querySelector.
 * @author charlie-map
 *
 * @param {string | Node} selector: A CSS query selector to search for. If passed a Node,
 *  this will instead build the cwqs functions into that Node.
 * @param {Function} cb: a callback which will be called if an element
 *  is found. This callback should take in a single parameter that is the
 *  return Node.
 * 
 * @returns {Node | null} The element that returns from the querySelector method.
 */
function $cwqs(selector, cb = null) {
	if (typeof selector == "object") {
		selector.$cwqs = $cwqs;
		selector.$cwqsSafe = $cwqsSafe;
		selector.$cwqsAll = $cwqsAll;

		return selector;
	}

	const el = (this == window ? document : this).querySelector(selector);
	if (el) {
		el.$cwqs = $cwqs;
		el.$cwqsSafe = $cwqsSafe;
		el.$cwqsAll = $cwqsAll;

		if (cb) {
			cb(el);
		}
	}

	return el;
}

/**
 * $cwqsSafe A wrapper around $cwqs that will ensure even just a basic
 *  element is return even if null. This will prevent
 *  existing code from breaking if this is just used in line (as it
 *  will avoid causing "Cannot read ____ of null" errors)
 * @author charlie-map
 *
 * @param {string | Node} selector: see $cwqs
 * Note: the cb parameter is not as this function is intended for
 *  use in direct access cases (i.e. document.querySelector(...).innerHTML or similar)
 *
 * @returns {Element | Element<cw-null>} The specific element request or a fake internal
 *  element with the tag "cw-null"
 */
function $cwqsSafe(selector) {
	if (!selector || typeof selector == "object") {
		selector = !selector ? document.createElement("cw-null") : selector;

		selector.$cwqs = $cwqs;
		selector.$cwqsSafe = $cwqsSafe;
		selector.$cwqsAll = $cwqsAll;

		return selector;
	}

	let el = (this == window ? document : this).querySelector(selector);
	if (!el) {
		el = document.createElement("cw-null");
	}

	el.$cwqs = $cwqs;
	el.$cwqsSafe = $cwqsSafe;
	el.$cwqsAll = $cwqsAll;

	return el;
}

/**
 * $cwqsAll A simple wrapper on $cwqs that will instead return an array of responses.
 * @author charlie-map
 *
 * @param {string} selector: A CSS query selector to search for.
 * @param {Function} cb: a callback which will be called ON EACH of the returned elements
 *  if any are found found. This callback should take in a single parameter that is the
 *  expected return Element.
 *
 * @returns {NodeList | []} The elements that returns from the querySelector method.
 */
function $cwqsAll(selector, cb) {
	const els = (this == window ? document : this).querySelectorAll(selector);
	if (els && els.length) {
		for (let elsIndex = 0; elsIndex < els.length; elsIndex++) {
			const el = els[elsIndex];

			el.$cwqs = $cwqs;
			el.$cwqsSafe = $cwqsSafe;
			el.$cwqsAll = $cwqsAll;

			if (cb) {
				cb(el);
			}
		}

		return els;
	} else {
		return [];
	}
}
