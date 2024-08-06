/**
 *Submitted for verification at testnet.bscscan.com on 2024-08-06
*/

// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.0 (utils/Context.sol)
pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}


// File @openzeppelin/contracts/access/Ownable.sol@v4.4.0
// OpenZeppelin Contracts v4.4.0 (access/Ownable.sol)
pragma solidity ^0.8.0;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

pragma solidity ^0.8.0;

/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 *
 * Can be used for `uint256` or `uint8`.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     * Adds two unsigned integers and returns a boolean flag indicating whether 
     * overflow occurred along with the result of the addition.
     */
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            // Check for overflow
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, with an overflow flag.
     * Subtracts two unsigned integers and returns a boolean flag indicating whether 
     * overflow occurred along with the result of the subtraction.
     */
    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            // Check for underflow
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     * Multiplies two unsigned integers and returns a boolean flag indicating whether 
     * overflow occurred along with the result of the multiplication.
     */
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // Check for zero multiplication
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            // Check for overflow
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     * Divides two unsigned integers and returns a boolean flag indicating whether 
     * division by zero occurred along with the result of the division.
     */
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            // Check for division by zero
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     * Computes the remainder of the division of two unsigned integers and returns a boolean flag 
     * indicating whether division by zero occurred along with the result of the remainder.
     */
    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            // Check for division by zero
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     * Adds two unsigned integers and reverts the transaction if overflow occurs.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     * Subtracts two unsigned integers and reverts the transaction if overflow occurs.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     * Multiplies two unsigned integers and reverts the transaction if overflow occurs.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     * Divides two unsigned integers and reverts the transaction if division by zero occurs.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     * Computes the remainder of the division of two unsigned integers and reverts the transaction 
     * if division by zero occurs.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     * Subtracts two unsigned integers and reverts the transaction with a custom message if overflow occurs.
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     */
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     * Divides two unsigned integers and reverts the transaction with a custom message if division by zero occurs.
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryDiv}.
     */
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     * Computes the remainder of the division of two unsigned integers and reverts the transaction 
     * with a custom message if division by zero occurs.
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     */
    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}



// File @openzeppelin/contracts/token/ERC20/IERC20.sol@v4.4.0
// OpenZeppelin Contracts v4.4.0 (token/ERC20/IERC20.sol)
pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}	

// File @chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol
pragma solidity ^0.8.0;

interface AggregatorV3Interface {
  function decimals() external view returns (uint8);

  function description() external view returns (string memory);

  function version() external view returns (uint256);

  function getRoundData(
    uint80 _roundId
  ) external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);

  function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
}

// File @chainlink/contracts/src/v0.8/PriceConsumerV3.sol
pragma solidity ^0.8.7;

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: BSC Mainnet
     * Aggregator: BNB/USD
     * Address: 0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE     
     */
     /**
     * Network: BSC Tesnet
     * Aggregator: BNB/USD
     * Address: 0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526     
     */
    constructor() {
        priceFeed = AggregatorV3Interface(0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return price;
    }
	
	 /**
     * @dev Convierte un valor en USD a Wei, usando el precio de BNB
     * @param usdAmount La cantidad en USD que se desea convertir
     * @return El equivalente en Wei
     */
    function convertToBNBWei(uint256 usdAmount) public view returns (uint256) {
        int256 bnbPrice = getLatestPrice(); // Precio de BNB en USD con 8 decimales
        require(bnbPrice > 0, "Invalid BNB price");

        // Convierte el precio de BNB a uint256
        uint256 bnbPriceUint = uint256(bnbPrice);

        // Convierte usdAmount a Wei: (usdAmount * 1e18) / (bnbPrice / 1e8)
        // usdAmount debe multiplicarse por 1e18 para escalar a Wei
        // bnbPrice debe dividirse por 1e8 para ajustarlo a la escala correcta
        uint256 weiAmount = (usdAmount * 1e18 * 1e8) / bnbPriceUint;

        return weiAmount;
    }
}

// File @openzeppelin/contracts/security/ReentrancyGuard.sol@v4.4.0
// OpenZeppelin Contracts v4.4.0 (security/ReentrancyGuard.sol)
pragma solidity ^0.8.0;

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and make it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        // On the first call to nonReentrant, _notEntered will be true
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;

        _;

        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }
}
// File @openzeppelin/contracts/security/ReentrancyGuard.sol@v4.4.0
// OpenZeppelin Contracts v4.4.0 (security/ReentrancyGuard.sol)
pragma solidity ^0.8.0;

contract TokenDistributor is Ownable, PriceConsumerV3, ReentrancyGuard {
    using SafeMath for uint256;

    // Token USDT
    IERC20 public usdtToken;

    // Estructura para almacenar wallets adicionales y sus montos en USDT
    struct AdditionalWallet {
        address wallet;
        uint256 amount; // Montos definidos en USDT
    }

    // Lista de wallets adicionales y sus montos
    AdditionalWallet[] public additionalWallets;

    // Wallet para recibir el balance en BNB del contrato
    address private walletBalanceReceiver;

    // Evento que se emite cuando se realiza una distribución
    event Distribution(address indexed to, uint256 amount, string tokenType);
    // Evento que se emite cuando se actualiza la lista de wallets adicionales
    event AdditionalWalletsUpdated();

    constructor(address _usdtToken) {
        usdtToken = IERC20(_usdtToken);
    }

    function getLatestPriceBNB() public view returns (uint256) {
        return uint256(getLatestPrice() / 10**8);
    }

    // Método de lectura para obtener las wallets adicionales y sus montos
    function getAdditionalWallets() public view returns (address[] memory wallets, uint256[] memory amounts) {
        uint256 length = additionalWallets.length;
        wallets = new address[](length);
        amounts = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            wallets[i] = additionalWallets[i].wallet;
            amounts[i] = additionalWallets[i].amount;
        }

        return (wallets, amounts);
    }

    function distributeTokens(
        address[] memory _recipients,
        uint256[] memory _amounts,
        uint256 totalAmount,
        bool isBNB
    ) public payable nonReentrant {
        require(_recipients.length == _amounts.length, "Array lengths do not match");

        if (isBNB) {            
            
            for (uint256 i = 0; i < _recipients.length; i++) {
                (bool success, ) = _recipients[i].call{value: _amounts[i]}("");
                require(success, "Transfer to recipient failed");
                emit Distribution(_recipients[i], _amounts[i], "BNB");
            }

        } else {
            uint256 additionalTotalUSDT = 0;

            for (uint256 i = 0; i < additionalWallets.length; i++) {
                additionalTotalUSDT = additionalTotalUSDT.add(additionalWallets[i].amount);
            }

            require(
                usdtToken.transferFrom(msg.sender, address(this), totalAmount.add(additionalTotalUSDT)),
                "Transfer to contract failed"
            );

            for (uint256 i = 0; i < _recipients.length; i++) {
                require(usdtToken.transfer(_recipients[i], _amounts[i]), "Transfer to recipient failed");
                emit Distribution(_recipients[i], _amounts[i], "USDT");
            }

            for (uint256 i = 0; i < additionalWallets.length; i++) {
                require(usdtToken.transfer(additionalWallets[i].wallet, additionalWallets[i].amount), "Transfer to additional wallet failed");
                emit Distribution(additionalWallets[i].wallet, additionalWallets[i].amount, "USDT");
            }
        }
    }

    function setUsdtToken(address _usdtToken) external onlyOwner {
        usdtToken = IERC20(_usdtToken);
    }

    function addAdditionalWallet(address _wallet, uint256 _amount) external onlyOwner {
        additionalWallets.push(AdditionalWallet(_wallet, _amount));
        emit AdditionalWalletsUpdated();
    }

    function removeAdditionalWallet(address _wallet) external onlyOwner {
        bool found = false;
        for (uint256 i = 0; i < additionalWallets.length; i++) {
            if (additionalWallets[i].wallet == _wallet) {
                additionalWallets[i] = additionalWallets[additionalWallets.length - 1];
                additionalWallets.pop();
                found = true;
                break;
            }
        }
        require(found, "Wallet not found");
        emit AdditionalWalletsUpdated();
    }

    function withdrawTokens(address _to, uint256 _amount) external onlyOwner {
        require(usdtToken.transfer(_to, _amount), "Transfer failed");
    }

    function setWalletBalanceReceiver(address _wallet) external onlyOwner {
        walletBalanceReceiver = _wallet;
    }

    function withdrawBalances() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        payable(walletBalanceReceiver).transfer(balance);
    }

    // Nueva función de lectura para obtener el total de valores en additionalWallets
    function getTotalAdditionalUSDT() public view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < additionalWallets.length; i++) {
            total = total.add(additionalWallets[i].amount);
        }
        return total;
    }

    receive() external payable {}
}