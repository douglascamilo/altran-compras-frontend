export class EventBusHelper {
  private _eventBusListeners = [];

  manterListeners(listeners) {
    if (listeners != null) {
      this._eventBusListeners = listeners;
    }
  }

  descadastrarListeners() {
    this._eventBusListeners.forEach(listener => listener.unsubscribe());
    this._eventBusListeners = [];
  }
}
