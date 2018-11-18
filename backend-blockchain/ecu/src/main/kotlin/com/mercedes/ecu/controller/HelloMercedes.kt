package com.mercedes.ecu.controller


import com.mercedes.ecu.domain.EcuReading
import com.mercedes.ecu.repository.EcuReadings
import com.mercedes.ecu.service.EthereumService
import org.springframework.http.HttpStatus.CREATED
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin(origins = ["http://localhost:3000"], maxAge = 6000)
class HelloMercedes(
    private val ethereumService: EthereumService,
    private val repository: EcuReadings
) {
    @GetMapping("/readings/{vin}")
    fun getReadingsByVin(@PathVariable("vin") vin: String) =
        ResponseEntity.ok(repository.findByVin(vin))

    @GetMapping("/reading/{id}")
    fun getReadingById(@PathVariable("id") id: String) =
        ResponseEntity.ok(repository.findById(id))

    @PostMapping("/readings/{vin}")
    fun createReadings(
        @PathVariable("vin") vin: String,
        @RequestBody reading: VehicleReading
    ): ResponseEntity<EcuReading> {
        val ecuReading = ethereumService.write(reading, vin)
        return ResponseEntity(ecuReading, CREATED)
    }

    data class VehicleReading(val kilometers: String, val consumption: String)
}
