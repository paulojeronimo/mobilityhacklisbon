package com.mercedes.ecu

import com.fasterxml.jackson.module.kotlin.KotlinModule
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

@SpringBootApplication
class EcuApplication {
    @Bean
    fun kotlinJacksonModule() = KotlinModule()
}

fun main(args: Array<String>) {
    runApplication<EcuApplication>(*args)
}
