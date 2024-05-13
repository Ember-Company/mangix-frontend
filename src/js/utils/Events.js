export default class Events {
  /**
   * Custom event listener for specified target and event type.
   * @param {HTMLElement|string} [targetElement=document] - The target element to listen for the event.
   * @param {string} event - The type of event to listen for.
   * @param {Function} callback - The callback function to execute when the event is triggered.
   */
  static $custom(targetElement, event = undefined, callback) {
    // if (!event) throw new EventError("Event Must be provided");
    // if (!callback) throw new EventError("A callback function must be provided");

    const element = targetElement ?? document;

    targetElement.addEventListener(event, async function (e) {
      await callback(e);

      return () => this.removeEventListener();
    });
  }

  /**
   * Event listener for when the page has finished loading.
   * @param {Function} callback - The callback function to execute when the page loads.
   */
  static $onPageLoad(callback) {
    if (!callback) console.error("provide a callback");

    document.addEventListener("DOMContentLoaded", (e) => {
      callback(e);
    });
  }

  /**
   * Event listener for click or double click events.
   * @param {HTMLElement|string} [targetElement=document] - The target element to listen for the click event.
   * @param {'click'|'dblclick'} [event='click'] - The type of click event to listen for.
   * @param {Function} callback - The callback function to execute when the click event is triggered.
   */
  static $click(targetElement = document, callback) {
    // if (!callback) throw new EventError("A callback function must be provided");

    targetElement.addEventListener("click", async function (e) {
      await callback(e);

      return () => this.removeEventListener();
    });
  }

  /**
   * Event listener for keyup events while typing.
   * @param {HTMLElement|string} [targetElement=document] - The target element to listen for keyup events.
   * @param {Function} callback - The callback function to execute when a keyup event is triggered.
   * TODO validate if the targetElement is a typeable element or not
   * Such as Input, TextArea, etc
   */
  static $whileTyping(targetElement = document, callback) {
    if (!callback) throw new EventError("A callback function must be provided");

    targetElement.addEventListener("keyup", async function (e) {
      await callback(e);

      return () => this.removeEventListener();
    });
  }

  /**
   * Event listener for change events.
   * @param {HTMLElement|string} [targetElement=document] - The target element to listen for change events.
   * @param {Function} callback - The callback function to execute when a change event is triggered.
   */
  static $change(targetElement = document, callback) {
    if (!callback) throw new EventError("A callback function must be provided");

    targetElement.addEventListener("keyup", async function (e) {
      await callback(e);

      return () => this.removeEventListener();
    });
  }
}
