package com.mercedes.ecu.service

import com.mercedes.ecu.controller.HelloMercedes.VehicleReading
import com.mercedes.ecu.domain.EcuReading
import com.mercedes.ecu.generated.Vehicle
import com.mercedes.ecu.repository.EcuReadings
import org.springframework.stereotype.Service
import java.math.BigInteger
import java.security.MessageDigest

@Service
class EthereumService(
    private val vehicle: Vehicle,
    private val repository: EcuReadings
) {

    fun write(reading: VehicleReading, vin: String): EcuReading {
        try {
            val hash = "v1:${hash(reading)}"

            val savedEcu = repository.save(EcuReading(
                vin = vin,
                consumption = reading.consumption,
                kilometers = reading.kilometers,
                hash = hash
            ))

            val transactionReceipt = vehicle.addReading(
                BigInteger(vin),
                "v1",
                reading.kilometers,
                reading.consumption,
                hash
            ).send()

            return repository.save(savedEcu.copy(txHash = transactionReceipt.transactionHash, block = transactionReceipt.blockHash))

        } catch (e: Exception) {
            throw ECUError(e.localizedMessage)
        }
    }

    private fun hash(reading: VehicleReading): String {
        val bytes = "${reading.consumption}:${reading.kilometers}".toByteArray()
        val md = MessageDigest.getInstance("SHA-256")
        val digest = md.digest(bytes)
        return digest.fold("", { str, it -> str + "%02x".format(it) })
    }

    class ECUError(msg: String) : RuntimeException(msg)
}
