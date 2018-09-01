/* eslint quotes: ["error", "double", "avoid-escape"] */
/* eslint quote-props: [2, "always"]*/
/* Don't modify anything outside the {} brackets.
 * Insides of the {} brackets should be formatted as a JSON object.
 * JSON rules:
 * 1. All keys and string values must be enclosed in double quotes.
 * 2. Each key/value pair should be on a new line.
 * 3. All values and keys must be constant, you can't use any Javascript
 *    functions.
 */
var constants = {
  "MAILHANDLER_URL": "/ajax/mailhandler",
  "PARTNERSHIPS_EMAIL_TYPE": "PARTNERSHIPS",
  "VOLUNTEER_EMAIL_TYPE": "VOLUNTEER",
  "THANKYOU_MESSAGE": "Your message has been forwarded to the Oppia " +
    "admins and we will get back to you shortly.",
};
