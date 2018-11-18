package com.mercedes.ecu.repository

import com.mercedes.ecu.domain.EcuReading
import org.springframework.data.repository.CrudRepository

interface EcuReadings: CrudRepository<EcuReading, String> {
    fun findByVin(vin: String): List<EcuReading>
}
