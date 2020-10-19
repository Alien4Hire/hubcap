import strangeIndicator from './simpleIndicator'
import entryExitIndicator from './entryExitIndicator'

export default (PineJS) => {
  return Promise.resolve([strangeIndicator(PineJS), entryExitIndicator(PineJS)])
}