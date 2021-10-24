## Smart Contract

```
-------- Deploy Version 1 --------
  'VaccineSystemStorage'
   --------------------------------
   > transaction hash:    0x45da443b66cf3bb2fa17246420d9f072e9d37f808f806a70d05eed8371d7e07b
   > Blocks: 2            Seconds: 4
   > contract address:    0x9419fbC49296a60d46fdBaf2c47B0a4c3319f83C
   > block number:        13298025
   > block timestamp:     1634455895
   > account:             0x11Ec65c2F9DFc2C9306b5Bfc79E2584dCAF7625C
   > balance:             0.38858305
   > gas used:            2688081 (0x290451)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.02688081 ETH

  'VaccineSupplyChain'
   ------------------------------
   > transaction hash:    0xaa73b53e376e459a68bf2a2679c816fd4ef0e21206fa149060eab9e94d71546e
   > Blocks: 1            Seconds: 4
   > contract address:    0xdb4Cf08af20D2391b1A2de75B22e93c130639015
   > block number:        13298032
   > block timestamp:     1634455916
   > account:             0x11Ec65c2F9DFc2C9306b5Bfc79E2584dCAF7625C
   > balance:             0.36716758
   > gas used:            2141547 (0x20ad6b)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.02141547 ETH

  'VaccineUserAttend'
   -----------------------------
   > transaction hash:    0x9211b19f77f8868f5f8f8c6510829c16c7e5c5ac5917052dbc8640b6096478b4
   > Blocks: 2            Seconds: 4
   > contract address:    0xf63Fb85E7b98C89922EcdBAfecFFFb5D3D1351f3
   > block number:        13298039
   > block timestamp:     1634455937
   > account:             0x11Ec65c2F9DFc2C9306b5Bfc79E2584dCAF7625C
   > balance:             0.35653976
   > gas used:            1062782 (0x10377e)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01062782 ETH



-------- Deploy Version 2 --------
> Network name:    'bscTestnet'
> Network id:      97
> Block gas limit: 29999542 (0x1c9c1b6)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x3329e3c07152d96356614ce9645ba0dcf7b20c3c59343fb2c5c7c9f7cde85f36
   > Blocks: 1            Seconds: 5
   > contract address:    0x034Fc810CF113Bc25B7F63DcB0fCed35BC649aAb
   > block number:        13335780
   > block timestamp:     1634569536
   > account:             0x11Ec65c2F9DFc2C9306b5Bfc79E2584dCAF7625C
   > balance:             2.33757229
   > gas used:            248854 (0x3cc16)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00248854 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 13335782)
   > confirmation number: 3 (block: 13335784)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00248854 ETH


2_deploy_contracts.js
=====================

   Deploying 'VaccineSystemStorage'
   --------------------------------
   > transaction hash:    0xcde09569c2f8586ca1615762fb2eeed12a755fbf66ed89fa45372556f99f4cef
   > Blocks: 3            Seconds: 8
   > contract address:    0x6fBaAe99D2759325C8e1dA3E02B9127B0Fe79835
   > block number:        13335790
   > block timestamp:     1634569566
   > account:             0x11Ec65c2F9DFc2C9306b5Bfc79E2584dCAF7625C
   > balance:             2.30748629
   > gas used:            2966087 (0x2d4247)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.02966087 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 13335792)
   > confirmation number: 3 (block: 13335794)

   Deploying 'VaccineSupplyChain'
   ------------------------------
   > transaction hash:    0x22011517df98568df695ce0460faf7635d10163dd4a337ed9128621084587937
   > Blocks: 1            Seconds: 4
   > contract address:    0x44c906809b719E47BE410FA15afE759A9446B36a
   > block number:        13335797
   > block timestamp:     1634569587
   > account:             0x11Ec65c2F9DFc2C9306b5Bfc79E2584dCAF7625C
   > balance:             2.28214868
   > gas used:            2533761 (0x26a981)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.02533761 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 13335799)
   > confirmation number: 3 (block: 13335801)

   Deploying 'VaccineUserAttend'
   -----------------------------
   > transaction hash:    0x5502d332f38a82f3e7d83d21994fddadb06611fe4b7d44f5af0f3c367c73c776
   > Blocks: 2            Seconds: 4
   > contract address:    0xfb27B88248D1B50c3769428ba81753076F9aA17f
   > block number:        13335804
   > block timestamp:     1634569608
   > account:             0x11Ec65c2F9DFc2C9306b5Bfc79E2584dCAF7625C
   > balance:             2.27152086
   > gas used:            1062782 (0x10377e)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01062782 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 13335806)
   > confirmation number: 3 (block: 13335808)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0656263 ETH


Summary
=======
> Total deployments:   4
> Final cost:          0.06811484 ETH



truffle compile
truffle migrate --network bscTestnet
truffle run verify VaccineSystemStorage@0x6fBaAe99D2759325C8e1dA3E02B9127B0Fe79835 --network bscTestnet
truffle run verify VaccineSupplyChain@0x44c906809b719E47BE410FA15afE759A9446B36a --network bscTestnet
truffle run verify VaccineUserAttend@0xfb27B88248D1B50c3769428ba81753076F9aA17f --network bscTestnet



VaccineSystemStorage 0x6fBaAe99D2759325C8e1dA3E02B9127B0Fe79835
VaccineSupplyChain   0x44c906809b719E47BE410FA15afE759A9446B36a
VaccineUserAttend    0xfb27B88248D1B50c3769428ba81753076F9aA17f


```