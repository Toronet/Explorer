
function dateoutput(dt)
{
    m = new Date(Date.parse(dt));
    return m.getUTCFullYear() + "/" +
        ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/" +
        ("0" + m.getUTCDate()).slice(-2) + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2);

}


function processNodeTransactionsData(data) {
	//alert ('getting transactions');
    var result = [];
    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
            result.push(processTransactionDataItem(data[i]));
			//alert (result[i].number);
       }
    }
    return result;
}

function processTransactionDataItem(tx) {
    var result = {};
    result.Sealer = tx.BK_Sealer;
    result.Block = tx.TX_BlockNumber;
    result.hash = tx.EV_Hash;
    result.hash_trunc = result.hash.substring(0,4)  + '...' + result.hash.substring(result.hash.length-5);
    result.hash_trunc2 = result.hash.substring(0,6)  + '...' + result.hash.substring(result.hash.length-7);
    result.contract = tx.EV_Contract; //Use
    result.asset = tx.EV_Contract; //Use
    result.type = tx.EV_Event;
    result.from = tx.EV_From;
	//console.log('from:' + result.from + ':');
	if ((!result.from) || (!result.from === 'NULL') || (!result.from === 'null') || (!result.from.toString() == 'NULL') || (!result.from.toString() == 'null')) 
	{
		result.from_trunc = '&nbsp;';
		result.from_trunc2 = '&nbsp;';
	}
	else
	{
		result.from_trunc = result.from.substring(0,3)  + '...' + result.from.substring(result.from.length-4);
		result.from_trunc2 = result.from.substring(0,5)  + '...' + result.from.substring(result.from.length-6);
	}
	result.from_trunc.replace('NULL...NULL','');
	result.from_trunc2.replace('null...null','');
    result.to = tx.EV_To;
	//console.log('to:' + result.to);
	if ((!result.to) || (!result.to === 'NULL') || (!result.to === 'null')) 
	{
		result.to_trunc = '&nbsp;';
		result.to_trunc2 = '&nbsp;';
	}
	else
	{
		result.to_trunc = result.to.substring(0,3)  + '...' + result.to.substring(result.to.length-4);
		result.to_trunc2 = result.to.substring(0,5)  + '...' + result.to.substring(result.to.length-6);
	}
	result.to_trunc.replace('NULL...NULL','');
	result.to_trunc2.replace('null...null','');
	
    result.rawvalue = tx.EV_Value;
    result.value = tx.EV_Value;
    result.value2 = tx.EV_Value2;
    result.fee = tx.EV_Fee;
    result.time = dateoutput(tx.EV_Time);
	//console.log('time: ' + result.time);
	//console.log('type: ' + result.type);
	
	var setfromtoto = 0;
	var settotofrom = 0;
    switch (tx.EV_Contract) {
        case "toroerc20Contract":
        case "toroclientContract":
			result.asset = 'TORO';
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "TORO transfer";
                    result.value = `${tx.EV_Value} TORO`;
                    break;
            }
            break;
        case "toroadminContract":
			result.asset = 'TORO';
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "TORO transfer";
                    result.value = `${tx.EV_Value} TORO`;
                    break;
                case "Mint":
                    result.type = "TORO mint";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
                case "Burn":
                    result.type = "TORO burn";
                    result.value = `${tx.EV_Value} TORO`;
                    break;
            }
            break;
        case "torosuperadminContract":
			result.asset = 'TORO';
            switch (tx.EV_Event) {
                case "MintReserve":
                    result.type = "TORO mint reserve";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
                case "BurnReserve":
                    result.type = "TORO burn reserve";
                    result.value = `${tx.EV_Value} TORO`;
                    break;
                case "TransferFromReserve":
                    result.type = "TORO transfer from reserve";
                    result.value = `${tx.EV_Value} TORO`;
                    break;
                case "TransferToReserve":
                    result.type = "TORO transfer to reserve";
                    result.value = `${tx.EV_Value} TORO`;
                    break;
            }
            break;
        case "dollarerc20Contract":
        case "dollarclientContract":
			result.asset = 'USD';
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τUSD transfer";
                    result.value = `${tx.EV_Value} τUSD`;
                    break;
                case "BuyToro":
                    result.type = "τUSD TORO exchange";
                    result.value = `${tx.EV_Value} τUSD`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "τUSD TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "dollaradminContract":
			result.asset = 'USD';
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τUSD transfer";
                    result.value = `${tx.EV_Value} τUSD`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τUSD deposit";
                    result.value = `${tx.EV_Value} τUSD`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τUSD export";
                    result.value = `${tx.EV_Value} τUSD`;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τUSD TORO exchange";
                    result.value = `${tx.EV_Value} τUSD`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "τUSD TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "dollarsuperadminContract":
			result.asset = 'USD';
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τUSD deposit reserve";
                    result.value = `${tx.EV_Value} τUSD`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τUSD withdrawal reserve";
                    result.value = `${tx.EV_Value} τUSD`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τUSD transfer from reserve";
                    result.value = `${tx.EV_Value} τUSD`;
                    break;
                case "TransferToReserve":
                    result.type = "τUSD transfer to reserve";
                    result.value = `${tx.EV_Value} τUSD`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τUSD reserve TORO exchange";
                    result.value = `${tx.EV_Value} τUSD`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "τUSD reserve TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "nairaerc20Contract":
        case "nairaclientContract":
			result.asset = 'NGN';
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τNGN transfer";
                    result.value = `${tx.EV_Value} τNGN`;
                    break;
                case "BuyToro":
                    result.type = "τNGN TORO exchange";
                    result.value = `${tx.EV_Value} τNGN`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "τNGN TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "nairaadminContract":
			result.asset = 'NGN';
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τNGN transfer";
                    result.value = `${tx.EV_Value} τNGN`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τNGN deposit";
                    result.value = `${tx.EV_Value} τNGN`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τNGN withdrawal";
                    result.value = `${tx.EV_Value} τNGN`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τNGN TORO exchange";
                    result.value = `${tx.EV_Value} τNGN`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "τNGN TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "nairasuperadminContract":
			result.asset = 'NGN';
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τNGN import reserve";
                    result.value = `${tx.EV_Value} τNGN`;
                    break;
                case "ExportReserve":
                    result.type = "τNGN withdrawal reserve";
                    result.value = `${tx.EV_Value} τNGN`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τNGN transfer from reserve";
                    result.value = `${tx.EV_Value} τNGN`;
                    break;
                case "TransferToReserve":
                    result.type = "τNGN transfer to reserve";
                    result.value = `${tx.EV_Value} τNGN`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τNGN reserve TORO exchange";
                    result.value = `${tx.EV_Value} τNGN`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "τNGN reserve TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "euroerc20Contract":
        case "euroclientContract":
			result.asset = 'EUR';
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τEUR transfer";
                    result.value = `${tx.EV_Value} τEUR`;
                    break;
                case "BuyToro":
                    result.type = "τEUR TORO exchange";
                    result.value = `${tx.EV_Value} τEUR`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "τEUR TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "euroadminContract":
			result.asset = 'EUR';
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τEUR transfer";
                    result.value = `${tx.EV_Value} τEUR`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τEUR deposit";
                    result.value = `${tx.EV_Value} τEUR`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τEUR withdrawal";
                    result.value = `${tx.EV_Value} τEUR`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τEUR TORO exchange";
                    result.value = `${tx.EV_Value} τEUR`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "τEUR TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "eurosuperadminContract":
			result.asset = 'EUR';
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τEUR deposit reserve";
                    result.value = `${tx.EV_Value} τEUR`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τEUR withdrawal reserve";
                    result.value = `${tx.EV_Value} τEUR`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τEUR transfer from reserve";
                    result.value = `${tx.EV_Value} τEUR`;
                    break;
                case "TransferToReserve":
                    result.type = "τEUR transfer to reserve";
                    result.value = `${tx.EV_Value} EU`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τEUR reserve TORO exchange";
                    result.value = `${tx.EV_Value} τEUR`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "τEUR reserve TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "pounderc20Contract":
        case "poundclientContract":
			result.asset = 'GBP';
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τGBP transfer";
                    result.value = `${tx.EV_Value} τGBP`;
                    break;
                case "BuyToro":
                    result.type = "τGBP TORO exchange";
                    result.value = `${tx.EV_Value} τGBP`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "τGBP TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "poundadminContract":
			result.asset = 'GBP';
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τGBP transfer";
                    result.value = `${tx.EV_Value} τGBP`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τGBP deposit";
                    result.value = `${tx.EV_Value} τGBP`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τGBP withdrawal";
                    result.value = `${tx.EV_Value} τGBP`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τGBP TORO exchange";
                    result.value = `${tx.EV_Value} τGBP`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "τGBP TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "poundsuperadminContract":
			result.asset = 'GBP';
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τGBP deposit reserve";
                    result.value = `${tx.EV_Value} τGBP`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τGBP withdrawal reserve";
                    result.value = `${tx.EV_Value} τGBP`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τGBP transfer from reserve";
                    result.value = `Transfer ${tx.EV_Value} τGBP`;
                    break;
                case "TransferToReserve":
                    result.type = "τGBP transfer to reserve";
                    result.value = `Transfer ${tx.EV_Value} τGBP`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τGBP reserve TORO exchange";
                    result.value = `Convert ${tx.EV_Value} τGBP`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "τGBP reserve TORO exchange";
                    result.value = `Convert ${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "egperc20Contract":
        case "egpclientContract":
			result.asset = 'EGP';
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τEGP transfer";
                    result.value = `${tx.EV_Value} τEGP`;
                    break;
                case "BuyToro":
                    result.type = "τEGP TORO exchange";
                    result.value = `${tx.EV_Value} τEGP`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "τEGP TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "egpadminContract":
			result.asset = 'EGP';
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τEGP transfer";
                    result.value = `${tx.EV_Value} τEGP`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τEGP deposit";
                    result.value = ` ${tx.EV_Value} τEGP`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τEGP withdrawal";
                    result.value = `${tx.EV_Value} τEGP`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τEGP TORO exchange";
                    result.value = `${tx.EV_Value} τEGP`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "τEGP TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "egpsuperadminContract":
			result.asset = 'EGP';
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τEGP deposit reserve";
                    result.value = `${tx.EV_Value} τEGP`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τEGP withdrawal reserve";
                    result.value = `${tx.EV_Value} τEGP`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τEGP transfer from reserve";
                    result.value = `${tx.EV_Value} τEGP`;
                    break;
                case "TransferToReserve":
                    result.type = "τEGP transfer to reserve";
                    result.value = `${tx.EV_Value} τEGP`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τEGP reserve TORO exchange";
                    result.value = `${tx.EV_Value} τEGP`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "τEGP reserve TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
                    break;
            }
            break;
        case "ksherc20Contract":
        case "kshclientContract":
			result.asset = 'KSH';
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τKSH transfer";
                    result.value = `${tx.EV_Value} τKSH`;
                    break;
                case "BuyToro":
                    result.type = "τKSH TORO exchange";
                    result.value = `${tx.EV_Value} τKSH`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "τKSH TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "kshadminContract":
			result.asset = 'KSH';
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τKSH transfer";
                    result.value = `${tx.EV_Value} τKSH`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τKSH deposit";
                    result.value = `${tx.EV_Value} τKSH`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τKSH withdrawal";
                    result.value = ` ${tx.EV_Value} τKSH`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τKSH TORO exchange";
                    result.value = `${tx.EV_Value} τKSH`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "τKSH TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "kshsuperadminContract":
			result.asset = 'KSH';
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τKSH deposit reserve";
                    result.value = `${tx.EV_Value} τKSH`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τKSH withdrawal reserve";
                    result.value = `${tx.EV_Value} τKSH`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τKSH transfer from reserve";
                    result.value = `${tx.EV_Value} τKSH`;
                    break;
                case "TransferToReserve":
                    result.type = "τKSH transfer to reserve";
                    result.value = `${tx.EV_Value} τKSH`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τKSH reserve TORO exchange";
                    result.value = `${tx.EV_Value} τKSH`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "τKSH reserve TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "zarerc20Contract":
        case "zarclientContract":
			result.asset = 'ZAR';
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τZAR transfer";
                    result.value = `${tx.EV_Value} τZAR`;
                    break;
                case "BuyToro":
                    result.type = "τZAR TORO exchange";
                    result.value = `${tx.EV_Value} τZAR`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "τZAR TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "zaradminContract":
			result.asset = 'ZAR';
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τZAR transfer";
                    result.value = `${tx.EV_Value} τZAR`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τZAR deposit";
                    result.value = `${tx.EV_Value} τZAR`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τZAR withdrawal";
                    result.value = `${tx.EV_Value} τZAR`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τZAR TORO exchange";
                    result.value = `${tx.EV_Value} τZAR`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "τZAR TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "espeessuperadminContract":
			result.asset = 'ZAR';
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "ESPS deposit reserve";
                    result.value = `${tx.EV_Value} ESPS`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "ESPS withdrawal reserve";
                    result.value = `${tx.EV_Value} ESPS`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "ESPS transfer from reserve";
                    result.value = `${tx.EV_Value} ESPS`;
                    break;
                case "TransferToReserve":
                    result.type = "ESPS transfer to reserve";
                    result.value = `${tx.EV_Value} ESPS`;
                    break;
                case "ReserveBuyToro":
                    result.type = "ESPS reserve TORO exchange";
                    result.value = `${tx.EV_Value} ESPS`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "ESPS reserve TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "espeeserc20Contract":
        case "espeesclientContract":
			result.asset = 'ESP';
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "ESPS transfer";
                    result.value = `${tx.EV_Value} ESPS`;
                    break;
                case "BuyToro":
                    result.type = "ESPS TORO exchange";
                    result.value = `${tx.EV_Value} ESPS`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "ESPS TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "espeesadminContract":
			result.asset = 'ESP';
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "ESPS transfer";
                    result.value = `${tx.EV_Value} ESPS`;
                    break;
                case "ImportCoin":
                case "ImportCoinWithCustomFee":
                    result.type = "ESPS deposit";
                    result.value = `${tx.EV_Value} ESPS`;
					setfromtoto = 1;
                    break;
                case "ExportCoin":
                case "ExportCoinWithCustomFee":
                    result.type = "ESPS withdrawal";
                    result.value = `${tx.EV_Value} ESPS`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "ESPS TORO exchange";
                    result.value = `${tx.EV_Value} ESPS`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "ESPS TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "espeessuperadminContract":
			result.asset = 'ESP';
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "ESPS deposit reserve";
                    result.value = `${tx.EV_Value} ESPS`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "ESPS withdrawal reserve";
                    result.value = `${tx.EV_Value} ESPS`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "ESPS transfer from reserve";
                    result.value = `${tx.EV_Value} ESPS`;
                    break;
                case "TransferToReserve":
                    result.type = "ESPS transfer to reserve";
                    result.value = `${tx.EV_Value} ESPS`;
                    break;
                case "ReserveBuyToro":
                    result.type = "ESPS reserve TORO exchange";
                    result.value = `${tx.EV_Value} ESPS`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "ESPS reserve TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "etherc20Contract":
        case "ethclientContract":
			result.asset = 'ETH';
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τETH transfer";
                    result.value = `${tx.EV_Value} τETH`;
                    break;
                case "BuyToro":
                    result.type = "τETH TORO exchange";
                    result.value = `${tx.EV_Value} τETH`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "τETH TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
                case "WithdrawCrypto":
                    result.type = "τETH withdrawal";
                    result.value = `${tx.EV_Value} τETH`;
					settotofrom = 1;
                    break;
            }
            break;
        case "ethadminContract":
			result.asset = 'ETH';
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τETH transfer";
                    result.value = ` ${tx.EV_Value} τETH`;
                    break;
                case "ImportCrypto":
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τETH deposit";
                    result.value = `${tx.EV_Value} τETH`;
					setfromtoto = 1;
                    break;
                case "ExportCrypto":
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τETH withdrawal";
                    result.value = `${tx.EV_Value} τETH`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τETH TORO exchange";
                    result.value = `${tx.EV_Value} τETH`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "τETH TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
                case "DepositCrypto":
                    result.type = "τETH deposit";
                    result.value = `${tx.EV_Value} τETH`;
					setfromtoto = 1;
                    break;
                case "AdminWithdrawCrypto":
                    result.type = "τETH withdrawal";
                    result.value = `${tx.EV_Value} τETH`;
                    break;
            }
            break;
        case "ethsuperadminContract":
			result.asset = 'ETH';
            switch (tx.EV_Event) {
                case "ImportCrypto":
                case "ImportReserve":
                    result.type = "τETH deposit reserve";
                    result.value = `${tx.EV_Value} τETH`;
					setfromtoto = 1;
                    break;
                case "ExportCrypto":
                case "ExportReserve":
                    result.type = "τETH withdrawal reserve";
                    result.value = `${tx.EV_Value} τETH`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τETH transfer from reserve";
                    result.value = `${tx.EV_Value} τETH`;
                    break;
                case "TransferToReserve":
                    result.type = "τETH transfer to reserve";
                    result.value = `${tx.EV_Value} τETH`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τETH reserve TORO exchange";
                    result.value = `${tx.EV_Value} τETH`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "τETH reserve TORO exchange";
                    result.value = `${tx.EV_Value} TORO`;
					setfromtoto = 1;
                    break;
            }
            break;
    }
	
	//set the null tos to the froms
	if (settotofrom == 1) result.to_trunc = result.from_trunc;
	if (settotofrom == 1) result.to_trunc2 = result.from_trunc2;
	if (settotofrom == 1) result.to = result.from;

	//set the null froms to the tos
	if (setfromtoto == 1) result.from_trunc = result.to_trunc;
	if (setfromtoto == 1) result.from_trunc2 = result.to_trunc2;
	if (setfromtoto == 1) result.from = result.to;

    return result;
}
