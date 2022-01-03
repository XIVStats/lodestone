import Language from '../locale/Language'

export type IMandatoryLocalizedString = {
  [key in Language]: string
}
