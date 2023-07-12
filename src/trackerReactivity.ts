import { Tracker } from 'meteor-ts-tracker'
import type ReactivityInterface from 'types/ReactivityInterface'

export default function trackerReactivity(): ReactivityInterface {
  return {
    create: () => {
      const dep = new Tracker.Dependency()
      return {
        depend: () => dep.depend(),
        notify: () => dep.changed(),
      }
    },
    onDispose: (callback) => {
      Tracker.onInvalidate(callback)
    },
  }
}
