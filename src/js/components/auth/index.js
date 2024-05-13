import getSession from "../../services/session";

class SessionHandler {
  constructor() {
    this.session = null;
  }

  async validateSession() {
    const session = await getSession();
    console.log(session);
  }

  setSession(session) {
    this.session = session ?? null;
  }
}

class EventError extends Error {
  constructor(message) {
    super(message);
  }
}

class Events {
  static errorTypes = [];

  static $custom(targetElement = document, event = undefined, callback) {
    if (!event) throw new EventError("Event Must be provided");
    if (!callback) throw new EventError("A callback function must be provided");

    targetElement.addEventListener(event, async function (e) {
      await callback(e);

      return () => this.removeEventListener();
    });
  }

  static $onPageLoad(callback) {
    if (!callback) throw new EventError("A callback function must be provided");

    document.addEventListener("DOMContentLoaded", async function (e) {
      await callback(e);

      return () => this.removeEventListener();
    });
  }
  /**
   * Short and convenient click Event
   * @param {string} targetElement - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
   * @param {'click'|'dblclick'} event - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
   *
   * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
   */
  static $click(targetElement = document, event = "click", callback) {
    const clickEvents = ["click", "dblclick"];

    if (!clickEvents.includes(event))
      throw new EventError("Event is not a click Event");
    if (!callback) throw new EventError("A callback function must be provided");

    targetElement.addEventListener(event, async function (e) {
      await callback(e);

      return () => this.removeEventListener();
    });
  }

  // TODO validate if the targetElement is a typeable element or not
  // Such as Input, TextArea, etc
  static $whileTyping(targetElement = document, callback) {
    if (!callback) throw new EventError("A callback function must be provided");

    targetElement.addEventListener("keyup", async function (e) {
      await callback(e);

      return () => this.removeEventListener();
    });
  }

  static $change(targetElement = document, callback) {
    if (!callback) throw new EventError("A callback function must be provided");

    targetElement.addEventListener("keyup", async function (e) {
      await callback(e);

      return () => this.removeEventListener();
    });
  }
}

class AuthHandler {
  constructor() {
    this.loginRole = window.location.href.split("/")[4];
    this.sessionHandler = new SessionHandler();

    this.init();
  }

  async init() {
    Events.$click;
  }
}
