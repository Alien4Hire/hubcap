import strangeIndicator from './simpleIndicator'
import essIndicator from './essIndicator'
import eslIndicator from './eslIndicator'

export default (PineJS) => {
  return Promise.resolve([
    strangeIndicator(PineJS),
    essIndicator(PineJS),
    eslIndicator(PineJS)
  ])
}