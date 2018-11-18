package com.mercedes.ecu.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.mercedes.ecu.repository.EcuReadings
import org.junit.Assert.assertNotNull
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.web.context.WebApplicationContext
import java.util.UUID
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post

@SpringBootTest
@RunWith(SpringRunner::class)
class HelloMercedesTest {

    private lateinit var mvc: MockMvc

    @Autowired
    private lateinit var context: WebApplicationContext
    @Autowired
    private lateinit var mapper: ObjectMapper
    @Autowired
    private lateinit var ecuReadings: EcuReadings

    private lateinit var vin: String

    @Before
    fun init() {
        mvc = webAppContextSetup(context)
            .build()
        vin = UUID.randomUUID().toString()
    }

    @Test
    fun `createReadings() - insert ecu information`() {
        post("/readings/$vin")
            .contentType(MediaType.APPLICATION_JSON_UTF8)
            .content(
                mapper.writeValueAsBytes(mapOf("kilometers" to "100", "consumption" to "6/100"))
            )

        val readings = ecuReadings.findByVin(vin)
        assertNotNull(readings)
    }
}
