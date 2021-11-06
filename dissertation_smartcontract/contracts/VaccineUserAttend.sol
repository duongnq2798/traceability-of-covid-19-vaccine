// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./VaccineSystemStorage.sol";
import "./Ownable.sol";

contract VaccineUserAttend is Ownable {
    /* Event Declare */
    event UserUpdate(
        address indexed user,
        string name,
        string contactNo,
        string role,
        bool isActive,
        string profileHash
    );
    event UserRoleUpdate(address indexed user, string role);

    /* Storage Variable */
    VaccineSystemStorage vaccineSystemStorage;

    constructor(address _vaccineSystemAddress) {
        vaccineSystemStorage = VaccineSystemStorage(_vaccineSystemAddress);
    }

    /* Create/Update An User */
    function updateUser(
        string memory _name,
        string memory _contactNo,
        string memory _role,
        bool _isActive,
        string memory _profileHash
    ) public returns (bool) {
        require(msg.sender != address(0), "User Is In Valid");

        /* Call Storage COntract */
        bool status = vaccineSystemStorage.setUser(
            msg.sender,
            _name,
            _contactNo,
            _role,
            _isActive,
            _profileHash
        );

        /* Call Event */
        emit UserUpdate(
            msg.sender,
            _name,
            _contactNo,
            _role,
            _isActive,
            _profileHash
        );

        emit UserRoleUpdate(msg.sender, _role);

        return status;
    }

    /* Create/Update User For Admin */
    function updateUserForAdmin(
        address _userAddress,
        string memory _name,
        string memory _contactNo,
        string memory _role,
        bool _isActive,
        string memory _profileHash
    ) public onlyOwner returns (bool) {
        require(_userAddress != address(0));

        /* Call Storage Contract */
        bool status = vaccineSystemStorage.setUser(
            _userAddress,
            _name,
            _contactNo,
            _role,
            _isActive,
            _profileHash
        );

        /* Call Event */
        /* Call Event */
        emit UserUpdate(
            _userAddress,
            _name,
            _contactNo,
            _role,
            _isActive,
            _profileHash
        );

        emit UserRoleUpdate(msg.sender, _role);

        return status;
    }

    /* Get User */
    function getUser(address _userAddress) public view returns(
        string memory name,
        string memory contactNo,
        string memory role,
        bool isActive,
        string memory profileHash
    ) {
        require(_userAddress != address(0), "User Address Is Invalid");

        /* Getting value from struct */
        (name, contactNo, role, isActive, profileHash) = vaccineSystemStorage.getUser(_userAddress);
        return (name, contactNo, role, isActive, profileHash);
    }
}
