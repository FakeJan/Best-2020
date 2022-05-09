// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface DonacijeVmesnik { 
    function doniranje () payable external;
    function povracilo () external;
}