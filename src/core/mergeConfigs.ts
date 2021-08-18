import { isPlainObject, deepMerge } from '../helpers/util'
import { AxiosRequestConfig } from '../types'

// 合并的具体策略实现
const strats = Object.create(null)
// 1、默认策略
function defaultStrat(val1: any, val2: any): any {
  if (val2 !== undefined) {
    return val2
  }

  return val1
}
// 2、只取val2 针对的是url data parmas这些不需要合并的数据
function fromCustomStrat(val1: any, val2: any): any {
  if (val2 !== undefined) {
    return val2
  }
}
;['url', 'data', 'params'].forEach(key => {
  strats[key] = fromCustomStrat
})

// 3、对象的合并策略 针对headers
function objectMergeStart(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (val2 !== undefined) {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (val1 !== undefined) {
    return val1
  }
}

;['headers'].forEach(key => {
  strats[key] = objectMergeStart
})

function mergeConfig(
  initConfig: AxiosRequestConfig,
  customConfig?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!customConfig) {
    customConfig = {}
  }

  const config = Object.create(null)

  // 优先处理自定义配置
  for (let key in customConfig) {
    mergeField(key)
  }

  for (let key in initConfig) {
    mergeField(key)
  }

  // 合并策略
  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(initConfig[key], customConfig[key])
  }

  return config
}
export default mergeConfig
