package com.mercedes.ecu.domain

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.time.Instant

@Document("ecu_readings")
data class EcuReading (
        @Id val id: String? = null,
        @Field val vin: String,
        @Field val consumption: String,
        @Field val kilometers: String,
        @Field val hash: String,
        @Field val block: String? = null,
        @Field val txHash: String? = null,
        @Field val timestamp: Instant = Instant.now()
)
