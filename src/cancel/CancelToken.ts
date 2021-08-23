import { Canceler, CancelExecutor, CancelTokenSource } from '../types'
import Cancel from './Cancel'

interface ResovlePromise {
  (message: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resovlePromise: ResovlePromise

    this.promise = new Promise<Cancel>(resovle => {
      // 延时执行
      resovlePromise = resovle
    })

    executor(message => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resovlePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    let token: CancelToken

    token = new CancelToken(c => {
      cancel = c
    })

    return {
      token,
      cancel
    }
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}
