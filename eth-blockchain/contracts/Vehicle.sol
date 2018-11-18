pragma solidity ^0.4.24;

contract Vehicle {
    struct Reading {
        string confirmationHash;
        string version;
        string mileage;
        string consumption;
    }

    mapping(uint => Reading) public readings;

    function Vehicle() public {
    }

    function addReading(
        uint _vin,
        string _version,
        string _mileage,
        string _consumption,
        string _hash
    ) public {

        readings[_vin] = Reading(_hash, _version, _mileage, _consumption);

    }
}
