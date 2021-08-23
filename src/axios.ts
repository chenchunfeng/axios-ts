import { AxiosRequestConfig, AxiosStatic } from './types'
import { extend } from './helpers/util'
import Axios from './core/Axios'
import defaults from './defaults'
import mergeConfig from './core/mergeConfigs'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.isCancel = isCancel
axios.Cancel = Cancel

export default axios
