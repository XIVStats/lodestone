/*
 * MIT License
 *
 * Copyright (c) 2021 Peter Reid <peter@reidweb.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import LodestoneError from './LodestoneError'
import RequestStatus from '../category/RequestStatus'
import RequestFailureCategory from '../category/RequestFailureCategory'
import { ILodestoneMaintenanceFailure } from '../interface/IResponse'

export default class LodestoneMaintenanceError<TypeOfIdentifier> extends LodestoneError<TypeOfIdentifier> {
  private static STATUS: RequestStatus.LodestoneMaintenance = RequestStatus.LodestoneMaintenance

  private static CATEGORY: RequestFailureCategory.RequestUncompletable = RequestFailureCategory.RequestUncompletable

  constructor(entityType: string, path: string, id: TypeOfIdentifier) {
    super(entityType, path, id, RequestStatus.LodestoneMaintenance, RequestFailureCategory.RequestRejected, 503)
  }

  public asResponse(): ILodestoneMaintenanceFailure<TypeOfIdentifier> {
    return {
      id: this.id,
      status: LodestoneMaintenanceError.STATUS,
      failureCategory: LodestoneMaintenanceError.CATEGORY,
    }
  }
}
