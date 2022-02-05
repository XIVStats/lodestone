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

import RequestStatus from '../category/RequestStatus'
import RequestFailureCategory from '../category/RequestFailureCategory'

export interface IResponse<TypeOfIdentifier> {
  status: RequestStatus
  id: TypeOfIdentifier
}

export interface ISuccessResponse<TypeOfIdentifier, TypeOfValue> extends IResponse<TypeOfIdentifier> {
  status: RequestStatus.Success
  value: TypeOfValue
}

export interface IRejectedRequestFailure<TypeOfIdentifier> extends IResponse<TypeOfIdentifier> {
  status: RequestStatus.TooManyRequests | RequestStatus.TimedOut
  failureCategory: RequestFailureCategory.RequestRejected
}

export interface ILodestoneMaintenanceFailure<TypeOfIdentifier> extends IResponse<TypeOfIdentifier> {
  status: RequestStatus.LodestoneMaintenance
  failureCategory: RequestFailureCategory.RequestUncompletable
}

export interface IUnknownCauseFailure<TypeOfIdentifier> extends IResponse<TypeOfIdentifier> {
  status: RequestStatus.OtherError | RequestStatus.ParseError
  failureCategory: RequestFailureCategory.UnknownCause
  error?: Error
}

export interface INotFoundResponse<TypeOfIdentifier> extends IResponse<TypeOfIdentifier> {
  status: RequestStatus.NotFound
  failureCategory: RequestFailureCategory.NotFound
}
