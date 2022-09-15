pragma solidity >=0.4.22 <0.9.0;
contract Buy_stocks {
    struct stock {
        uint256 timestamp;
        uint256 high;
        uint256 low;
        uint256 open;
        uint256 close;
        uint volume;
        string owner;
    }
    struct payment {
         string Buyer;
         uint256 price;
         stock stock_;
    }
  
    struct Sale {
        uint256 _id;
        string seller;
        stock stock_;
        uint sale_price;
        string  customer;
        bool for_sale;
        bool sold;
    }
    struct wallet {
        string owner;
         uint256 balance;
    }
    mapping(string=>wallet) public wallets;
    mapping (uint=>payment)  public PaymentTransactions;
    mapping(uint=>Sale) public SalesTransactions; 
    
    uint public size=0;
    uint public size2=0;
    uint public size3=0;

   function addPaymentTransaction(uint256 timestamp,

   uint256 high,uint256 low,uint256 open,uint256 close
   ,uint volume,string memory Buyer,string memory owner) public  returns (bool success)
   {
    size+=1;
    
    PaymentTransactions[size]=payment(Buyer,close, stock(timestamp,high,low,open,close,volume,owner));
    //SalesTransactions[size2]=Sale(size2,owner,stock(timestamp,high,low,open,close,volume,owner),close,Buyer,true,true);
   
    return true;
   }
   function sellShareofaStock(uint256 timestamp,uint256 high,uint256 low,uint sale_price,uint256 open,
   string memory Financial_Instrument,uint256 close,uint volume,string memory seller) public returns (Sale memory s)
   {
       size2+=1;
       SalesTransactions[size2]=Sale(size2,seller,stock(timestamp,high,low,open,close,volume,Financial_Instrument),sale_price,"xxxxxx",true,false);
       return SalesTransactions[size2];
   }
   function UpdatesellShareofAstock(uint _id,string memory customer) public returns (Sale memory s)
   {
       SalesTransactions[_id].customer=customer;
       SalesTransactions[_id].sold=true;
       stock  memory stock_=SalesTransactions[_id].stock_;
       stock_.owner=SalesTransactions[_id].seller;
       size+=1;
       PaymentTransactions[size]=payment(customer,SalesTransactions[_id].sale_price, stock_);
       return SalesTransactions[_id];
   }
  
 
function getPaymentTransactionsList() public view returns (payment[] memory) 
    {
        payment[] memory memoryArray = new payment[](size);
        for(uint i = 0; i < size; i++)
           {
            memoryArray[i] = PaymentTransactions[i];
           }
        return memoryArray;
    }
function getSalesTransactionsList() public view returns (Sale[] memory) 
    {
        Sale[] memory memoryArray = new Sale[](size);
        for(uint i = 0; i < size; i++)
           {
            memoryArray[i] = SalesTransactions[i];
           }
        return memoryArray;
    }
function addFundsToWallet(string memory owner,uint256 amount) public returns(wallet memory w) {
wallets[owner]= wallet(owner,wallets[owner].balance+amount);
return wallets[owner];
}
function walletexchange(string memory sender,string memory reciever,uint256 amount) public
{  
 wallets[sender]= wallet(sender,wallets[sender].balance-amount);  
 wallets[reciever]= wallet(reciever,wallets[reciever].balance+amount);
    
}
}