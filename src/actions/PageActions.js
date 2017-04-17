import { SET_YEAR } from '../constants/Page'

export function setYear(year) {

  return {
    type: SET_YEAR, //аналогично, теперь используем константу
    payload: year
  }

}
