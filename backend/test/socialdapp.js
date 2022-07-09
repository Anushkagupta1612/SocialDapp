const { expect } = require( "chai" );

describe( "socialdapp", function () {

  let social, socialDeployed, owner, ad1, ad2;

  beforeEach( async function () {
    social = await ethers.getContractFactory( "socialdapp" );
    socialDeployed = await social.deploy();
    [ owner, ad1, ad2 ] = await ethers.getSigners();
  } )

  describe( "To check if images are added", function () {
    it( "Now checking the author", async function () {
      await socialDeployed.addImages( 'QmSCJt23kRCjT1S1G2PKqwWonzUUMW4hNKPLVys9VV15K9', "For testing purposes" );
      const count1 = await socialDeployed.imgCount();
      const add = await socialDeployed.images( count1 );
      expect( add.author ).to.equal( owner.address );
    } )

    it( "Now checking the CID", async function () {
      await socialDeployed.addImages( "QmSCJt23kRCjT1S1G2PKqwWonzUUMW4hNKPLVys9VV15K9", "For testing purposes" );
      const count1 = await socialDeployed.imgCount();
      const add = await socialDeployed.images( count1 );
      expect( add.cid ).to.equal( "QmSCJt23kRCjT1S1G2PKqwWonzUUMW4hNKPLVys9VV15K9" );
    } )

    it( "Now checking for valid hash", async function () {
      expect( socialDeployed.addImages( "0", "For checking with 0 hash" ) ).to.be.revertedWith( "Zero hash not valid" );
    } )

    it( "Now checking for empty description", async function () {
      expect( socialDeployed.addImages( "QmSCJt23kRCjT1S1G2PKqwWonzUUMW4hNKPLVys9VV15K9", "" ) ).to.be.revertedWith( "Nothing in description" );
    } )

  } )

  describe( "Giving Tips", function () {
    it( "Checking author's balance and tip amount", async function () {
      await socialDeployed.addImages( "QmYbSDLefUBSHhcGJqiqx2w1J1AoqRmHW1QpCz6S9A7ehE", "Welcome to InstaDapp" )
      await socialDeployed.addImages( "QmYbSDLefUBSHhcGJqiqx2w1J1AoqRmHW1QpCz6S9A7ehE", "Welcome to InstaDapp" )
      const obj = await socialDeployed.images( 2 );
      const _author = obj.author;
      const _tip = obj.tip;
      const provider = waffle.provider;
      const balanceOfauthor = await provider.getBalance( _author );
      await socialDeployed.connect( ad1 ).getTips( 2, { value: ethers.utils.parseEther( "1" ) } );
      const balanceOfauthor1 = await provider.getBalance( _author );
      const actualbal = balanceOfauthor.add( ethers.utils.parseEther( "1" ) );
      const objnow = await socialDeployed.images( 2 );
      const _tipnow = objnow.tip;
      expect( balanceOfauthor1 ).to.equal( actualbal );
      expect( _tipnow ).to.equal( _tip.add( ethers.utils.parseEther( "1" ) ) )
    } )

  } );
} );