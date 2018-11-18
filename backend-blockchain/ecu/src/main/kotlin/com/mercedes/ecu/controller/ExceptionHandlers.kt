package com.mercedes.ecu.controller

import com.mercedes.ecu.controller.ApiError.UNEXPECTED_ERROR
import com.mercedes.ecu.service.EthereumService.ECUError
import org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class ExceptionHandlers {
    @ExceptionHandler(ECUError::class)
    fun handleInsufficientScopeGrantsRequest(exception: ECUError): ResponseEntity<Any> {
        return UNEXPECTED_ERROR.asHttpResponse(INTERNAL_SERVER_ERROR)
    }
}
