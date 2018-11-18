package com.mercedes.ecu.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

object ApiError {
    class ERROR(code: String, message: String) : HashMap<String, String>() {
        init {
            this["code"] = code
            this["message"] = message
        }
    }

    val UNEXPECTED_ERROR = ERROR("000001", "An unexpected error has occurred.")
}

fun ApiError.ERROR.asHttpResponse(status: HttpStatus): ResponseEntity<Any> = ResponseEntity(this, status)
