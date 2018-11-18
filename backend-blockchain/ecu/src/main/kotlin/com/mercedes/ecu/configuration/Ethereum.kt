package com.mercedes.ecu.configuration

import com.mercedes.ecu.generated.Vehicle
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.DependsOn
import org.web3j.protocol.http.HttpService
import org.web3j.protocol.Web3j
import org.springframework.core.io.Resource
import org.web3j.crypto.Credentials
import java.math.BigInteger

@Configuration
class Ethereum(
    @Value(value = "classpath:wallet")
    private val resource: Resource
) {
    companion object {
        val GAS_PRICE = BigInteger("1000")
        val GAS_LIMIT = BigInteger("90000")
    }

    @Bean fun web3j() = Web3j.build(HttpService("http://ganache:8545"))

    @Bean
    @DependsOn("web3j")
    fun vehicle(web3j: Web3j): Vehicle {
        val credentials = Credentials.create("0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef")

        var vehicle = Vehicle.load(
            "0x4A814195DB2D34cb967d4221C5E9dBb616B1B9a4",
            web3j,
            credentials,
            GAS_PRICE,
            GAS_LIMIT
        )

        if (vehicle == null ) {
            vehicle = Vehicle.deploy(web3j, credentials, BigInteger("10"), BigInteger("900000")).send()
        }

        return vehicle
    }
}
