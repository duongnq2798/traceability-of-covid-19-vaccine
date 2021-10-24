var VaccineSystemStorage = artifacts.require("./VaccineSystemStorage");
var VaccineSupplyChain = artifacts.require("./VaccineSupplyChain");
var VaccineUserAttend = artifacts.require("./VaccineUserAttend");


module.exports = function(deployer){
	deployer.deploy(VaccineSystemStorage)
	.then(()=>{
		return deployer.deploy(VaccineSupplyChain,VaccineSystemStorage.address);
	})
	.then(()=>{
		return deployer.deploy(VaccineUserAttend,VaccineSystemStorage.address);
	})
	.then(()=>{
   		return VaccineSystemStorage.deployed();
    }).then(async function(instance){
		await instance.authorizeCaller(VaccineSupplyChain.address); 
		await instance.authorizeCaller(VaccineUserAttend.address);
		return instance;
	})
	.catch(function(error)
	{
		console.log(error);
	});
};





