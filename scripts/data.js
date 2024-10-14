function processTxData(data) {
    var result = [];
    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
            result.push(processTxDataItem(data[i]));
        }
    }
    return result;
}
function processTxDataAddress(data, addr) {
    var result = [];
    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
            result.push(processTxDataItemAddress(data[i], addr));
        }
    }
    return result;
}

function processTxDataItem(tx) {
    var result = {};
    result.hash = tx.EV_Hash;
    result.hash_trunc = result.hash.substring(0,4)  + '...' + result.hash.substring(result.hash.length-5);
    result.hash_trunc2 = result.hash.substring(0,6)  + '...' + result.hash.substring(result.hash.length-7);
    result.contract = tx.EV_Contract; //Use
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
	
    result.value = tx.EV_Value;
    result.value2 = tx.EV_Value2;
    result.fee = tx.EV_Fee;
	
	var setfromtoto = 0;
	var settotofrom = 0;
		
    switch (tx.EV_Contract) {
        case "toroerc20Contract":
        case "toroclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "TORO transfer";
                    result.description = `Transfer ${tx.EV_Value} TORO from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} TORO)`;
                    break;
            }
            break;
        case "toroadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "TORO transfer";
                    result.description = `Transfer ${tx.EV_Value} TORO from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} TORO)`;
                    break;
                case "Mint":
                    result.type = "TORO mint";
                    result.description = `Mint ${tx.EV_Value} TORO to ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "Burn":
                    result.type = "TORO burn";
                    result.description = `Burn ${tx.EV_Value} TORO from ${tx.EV_From}`;
                    break;
            }
            break;
        case "torosuperadminContract":
            switch (tx.EV_Event) {
                case "MintReserve":
                    result.type = "TORO mint reserve";
                    result.description = `Mint ${tx.EV_Value} TORO to TORO reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "BurnReserve":
                    result.type = "TORO burn reserve";
                    result.description = `Burn ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From}`;
                    break;
                case "TransferFromReserve":
                    result.type = "TORO transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "TORO transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} TORO from ${tx.EV_From} to TORO reserve ${tx.EV_To}`;
                    break;
            }
            break;
        case "dollarerc20Contract":
        case "dollarclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τUSD transfer";
                    result.description = `Transfer ${tx.EV_Value} τUSD from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τUSD)`;
                    break;
                case "BuyToro":
                    result.type = "τUSD TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τUSD (fee: ${tx.EV_Fee} τUSD)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO τUSD exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τUSD (fee: ${tx.EV_Fee} τUSD)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "dollaradminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τUSD transfer";
                    result.description = `Transfer ${tx.EV_Value} τUSD from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τUSD)`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τUSD deposit";
                    result.description = `Import ${tx.EV_Value} τUSD to ${tx.EV_To} (fee: ${tx.EV_Fee} τUSD)`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τUSD withdrawal";
                    result.description = `Export ${tx.EV_Value} τUSD from ${tx.EV_From} (fee: ${tx.EV_Fee} τUSD)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τUSD TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τUSD (fee: ${tx.EV_Fee} τUSD)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τUSD exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τUSD (fee: ${tx.EV_Fee} τUSD)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "dollarsuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τUSD deposit reserve";
                    result.description = `Import ${tx.EV_Value} τUSD to τUSD reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τUSD withdrawal reserve";
                    result.description = `Export ${tx.EV_Value} τUSD from τUSD reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τUSD transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τUSD from τUSD reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τUSD transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τUSD from ${tx.EV_From} to τUSD reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τUSD reserve TORO exchange";
                    result.description = `Convert ${tx.EV_Value} τUSD from τUSD reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τUSD reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τUSD in τUSD reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "nairaerc20Contract":
        case "nairaclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τNGN transfer";
                    result.description = `Transfer ${tx.EV_Value} τNGN from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τNGN)`;
                    break;
                case "BuyToro":
                    result.type = "τNGN TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τNGN (fee: ${tx.EV_Fee} τNGN)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO τNGN exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τNGN (fee: ${tx.EV_Fee} τNGN)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "nairaadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τNGN transfer";
                    result.description = `Transfer ${tx.EV_Value} τNGN from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τNGN)`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τNGN deposit";
                    result.description = `Import ${tx.EV_Value} τNGN to ${tx.EV_To} (fee: ${tx.EV_Fee} τNGN)`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τNGN withdrawal";
                    result.description = `Export ${tx.EV_Value} τNGN from ${tx.EV_From} (fee: ${tx.EV_Fee} τNGN)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τNGN TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τNGN (fee: ${tx.EV_Fee} τNGN)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τNGN exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τNGN (fee: ${tx.EV_Fee} τNGN)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "nairasuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τNGN deposit reserve";
                    result.description = `Import ${tx.EV_Value} τNGN to τNGN reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τNGN withdrawal reserve";
                    result.description = `Export ${tx.EV_Value} τNGN from τNGN reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τNGN transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τNGN from τNGN reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τNGN transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τNGN from ${tx.EV_From} to τNGN reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τNGN reserve TORO exchange";
                    result.description = `Convert ${tx.EV_Value} τNGN from τNGN reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τNGN reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τNGN in τNGN reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "euroerc20Contract":
        case "euroclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τEUR transfer";
                    result.description = `Transfer ${tx.EV_Value} τEUR from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τEUR)`;
                    break;
                case "BuyToro":
                    result.type = "τEUR TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τEUR (fee: ${tx.EV_Fee} τEUR)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO τEUR exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τEUR (fee: ${tx.EV_Fee} τEUR)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "euroadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τEUR transfer";
                    result.description = `Transfer ${tx.EV_Value} τEUR from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τEUR)`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τEUR deposit";
                    result.description = `Import ${tx.EV_Value} τEUR to ${tx.EV_To} (fee: ${tx.EV_Fee} τEUR)`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τEUR withdrawal";
                    result.description = `Export ${tx.EV_Value} τEUR from ${tx.EV_From} (fee: ${tx.EV_Fee} τEUR)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τEUR TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τEUR (fee: ${tx.EV_Fee} τEUR)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τEUR exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τEUR (fee: ${tx.EV_Fee} τEUR)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "eurosuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τEUR deposit reserve";
                    result.description = `Import ${tx.EV_Value} τEUR to τEUR reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τEUR withdrawal reserve";
                    result.description = `Export ${tx.EV_Value} τEUR from τEUR reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τEUR transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τEUR from τEUR reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τEUR transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τEUR from ${tx.EV_From} to τEUR reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τEUR reserve TORO exchange";
                    result.description = `Convert ${tx.EV_Value} τEUR from τEUR reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τEUR reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τEUR in τEUR reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "pounderc20Contract":
        case "poundclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τGBP transfer";
                    result.description = `Transfer ${tx.EV_Value} τGBP from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τGBP)`;
                    break;
                case "BuyToro":
                    result.type = "τGBP TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τGBP (fee: ${tx.EV_Fee} τGBP)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO τGBP exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τGBP (fee: ${tx.EV_Fee} τGBP)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "poundadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τGBP transfer";
                    result.description = `Transfer ${tx.EV_Value} τGBP from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τGBP)`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τGBP deposit";
                    result.description = `Import ${tx.EV_Value} τGBP to ${tx.EV_To} (fee: ${tx.EV_Fee} τGBP)`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τGBP withdrawal";
                    result.description = `Export ${tx.EV_Value} τGBP from ${tx.EV_From} (fee: ${tx.EV_Fee} τGBP)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τGBP TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τGBP (fee: ${tx.EV_Fee} τGBP)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τGBP exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τGBP (fee: ${tx.EV_Fee} τGBP)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "poundsuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τGBP deposit reserve";
                    result.description = `Import ${tx.EV_Value} τGBP to τGBP reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τGBP withdrawal reserve";
                    result.description = `Export ${tx.EV_Value} τGBP from τGBP reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τGBP transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τGBP from τGBP reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τGBP transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τGBP from ${tx.EV_From} to τGBP reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τGBP reserve TORO exchange";
                    result.description = `Convert ${tx.EV_Value} τGBP from τGBP reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τGBP reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τGBP in τGBP reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "egperc20Contract":
        case "egpclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τEGP transfer";
                    result.description = `Transfer ${tx.EV_Value} τEGP from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τEGP)`;
                    break;
                case "BuyToro":
                    result.type = "τEGP TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τEGP (fee: ${tx.EV_Fee} τEGP)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO τEGP exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τEGP (fee: ${tx.EV_Fee} τEGP)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "egpadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τEGP transfer";
                    result.description = `Transfer ${tx.EV_Value} τEGP from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τEGP)`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τEGP deposit";
                    result.description = `Import ${tx.EV_Value} τEGP to ${tx.EV_To} (fee: ${tx.EV_Fee} τEGP)`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τEGP withdrawal";
                    result.description = `Export ${tx.EV_Value} τEGP from ${tx.EV_From} (fee: ${tx.EV_Fee} τEGP)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τEGP TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τEGP (fee: ${tx.EV_Fee} τEGP)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τEGP exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τEGP (fee: ${tx.EV_Fee} τEGP)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "egpsuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τEGP deposit reserve";
                    result.description = `Import ${tx.EV_Value} τEGP to τEGP reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τEGP withdrawal reserve";
                    result.description = `Export ${tx.EV_Value} τEGP from τEGP reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τEGP transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τEGP from τEGP reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τEGP transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τEGP from ${tx.EV_From} to τEGP reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τEGP reserve TORO exchange";
                    result.description = `Convert ${tx.EV_Value} τEGP from τEGP reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τEGP reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τEGP in τEGP reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "ksherc20Contract":
        case "kshclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τKSH transfer";
                    result.description = `Transfer ${tx.EV_Value} τKSH from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τKSH)`;
                    break;
                case "BuyToro":
                    result.type = "τKSH TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τKSH (fee: ${tx.EV_Fee} τKSH)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO τKSH exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τKSH (fee: ${tx.EV_Fee} τKSH)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "kshadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τKSH transfer";
                    result.description = `Transfer ${tx.EV_Value} τKSH from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τKSH)`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τKSH deposit";
                    result.description = `Import ${tx.EV_Value} τKSH to ${tx.EV_To} (fee: ${tx.EV_Fee} τKSH)`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τKSH withdrawal";
                    result.description = `Export ${tx.EV_Value} τKSH from ${tx.EV_From} (fee: ${tx.EV_Fee} τKSH)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τKSH TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τKSH (fee: ${tx.EV_Fee} τKSH)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τKSH exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τKSH (fee: ${tx.EV_Fee} τKSH)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "kshsuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τKSH deposit reserve";
                    result.description = `Import ${tx.EV_Value} τKSH to τKSH reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τKSH withdrawal reserve";
                    result.description = `Export ${tx.EV_Value} τKSH from τKSH reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τKSH transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τKSH from τKSH reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τKSH transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τKSH from ${tx.EV_From} to τKSH reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τKSH reserve TORO exchange";
                    result.description = `Convert ${tx.EV_Value} τKSH from τKSH reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τKSH reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τKSH in τKSH reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "zarerc20Contract":
        case "zarclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τZAR transfer";
                    result.description = `Transfer ${tx.EV_Value} τZAR from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τZAR)`;
                    break;
                case "BuyToro":
                    result.type = "τZAR TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τZAR (fee: ${tx.EV_Fee} τZAR)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO τZAR exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τZAR (fee: ${tx.EV_Fee} τZAR)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "zaradminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τZAR transfer";
                    result.description = `Transfer ${tx.EV_Value} τZAR from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τZAR)`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τZAR deposit";
                    result.description = `Import ${tx.EV_Value} τZAR to ${tx.EV_To} (fee: ${tx.EV_Fee} τZAR)`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τZAR withdrawal";
                    result.description = `Export ${tx.EV_Value} τZAR from ${tx.EV_From} (fee: ${tx.EV_Fee} τZAR)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τZAR TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τZAR (fee: ${tx.EV_Fee} τZAR)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τZAR exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τZAR (fee: ${tx.EV_Fee} τZAR)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "zarsuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τZAR deposit reserve";
                    result.description = `Import ${tx.EV_Value} τZAR to τZAR reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τZAR withdrawal reserve";
                    result.description = `Export ${tx.EV_Value} τZAR from τZAR reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τZAR transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τZAR from τZAR reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τZAR transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τZAR from ${tx.EV_From} to τZAR reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τZAR reserve TORO exchange";
                    result.description = `Convert ${tx.EV_Value} τZAR from τZAR reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τZAR reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τZAR in τZAR reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "espeeserc20Contract":
        case "espeesclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "ESPS transfer";
                    result.description = `Transfer ${tx.EV_Value} ESPS from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} ESPS)`;
                    break;
                case "BuyToro":
                    result.type = "ESPS TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} ESPS (fee: ${tx.EV_Fee} ESPS)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO ESPS exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} ESPS (fee: ${tx.EV_Fee} ESPS)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "espeesadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "ESPS transfer";
                    result.description = `Transfer ${tx.EV_Value} ESPS from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} ESPS)`;
                    break;
                case "ImportCoin":
                case "ImportCoinWithCustomFee":
                    result.type = "ESPS import";
                    result.description = `Import ${tx.EV_Value} ESPS to ${tx.EV_To} (fee: ${tx.EV_Fee} ESPS)`;
					setfromtoto = 1;
                    break;
                case "ExportCoin":
                case "ExportCoinWithCustomFee":
                    result.type = "ESPS export";
                    result.description = `Export ${tx.EV_Value} ESPS from ${tx.EV_From} (fee: ${tx.EV_Fee} ESPS)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "TORO ESPS exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} ESPS (fee: ${tx.EV_Fee} ESPS)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO ESPS exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} ESPS (fee: ${tx.EV_Fee} ESPS)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "espeessuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "ESPS import reserve";
                    result.description = `Import ${tx.EV_Value} ESPS to ESPS reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "ESPS export reserve";
                    result.description = `Export ${tx.EV_Value} ESPS from ESPS reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "ESPS transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} ESPS from ESPS reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "ESPS transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} ESPS from ${tx.EV_From} to ESPS reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "ESPS TORO reserve exchange";
                    result.description = `Convert ${tx.EV_Value} ESPS from ESPS reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO ESPS reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} ESPS in ESPS reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
		//-----------------------------------------------------------------
		//Plast
		case "plasterc20Contract":
        case "plastclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "PLAST transfer";
                    result.description = `Transfer ${tx.EV_Value} PLAST from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} PLAST)`;
                    break;
                case "BuyToro":
                    result.type = "PLAST TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} PLAST (fee: ${tx.EV_Fee} PLAST)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO PLAST exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} PLAST (fee: ${tx.EV_Fee} PLAST)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "plastadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "PLAST transfer";
                    result.description = `Transfer ${tx.EV_Value} PLAST from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} PLAST)`;
                    break;
                case "ImportCoin":
                case "ImportCoinWithCustomFee":
                    result.type = "PLAST import";
                    result.description = `Import ${tx.EV_Value} PLAST to ${tx.EV_To} (fee: ${tx.EV_Fee} PLAST)`;
					setfromtoto = 1;
                    break;
                case "ExportCoin":
                case "ExportCoinWithCustomFee":
                    result.type = "PLAST export";
                    result.description = `Export ${tx.EV_Value} PLAST from ${tx.EV_From} (fee: ${tx.EV_Fee} PLAST)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "TORO PLAST exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} PLAST (fee: ${tx.EV_Fee} PLAST)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO PLAST exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} PLAST (fee: ${tx.EV_Fee} PLAST)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "plastsuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "PLAST import reserve";
                    result.description = `Import ${tx.EV_Value} PLAST to PLAST reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "PLAST export reserve";
                    result.description = `Export ${tx.EV_Value} PLAST from PLAST reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "PLAST transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} PLAST from PLAST reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "PLAST transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} PLAST from ${tx.EV_From} to PLAST reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "PLAST TORO reserve exchange";
                    result.description = `Convert ${tx.EV_Value} PLAST from PLAST reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO PLAST reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} PLAST in PLAST reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;

		//-----------------------------------------------------------------
        case "etherc20Contract":
        case "ethclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                    result.type = "τETH transfer";
                    result.description = `Transfer ${tx.EV_Value} τETH from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τETH)`;
                    break;
                case "BuyToro":
                    result.type = "τETH TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τETH (fee: ${tx.EV_Fee} τETH)`;
					settotofrom = 1;
					//alert( 'BUYETH: ' + result.description);
                    break;
                case "SellToro":
                    result.type = "TORO τETH exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τETH (fee: ${tx.EV_Fee} τETH)`;
					setfromtoto = 1;
                    break;
                case "WithdrawCrypto":
                    result.type = "τETH withdrawal";
                    result.description = `Withdraw ${tx.EV_Value} τETH from ${tx.EV_From} (fee: ${tx.EV_Fee} τETH)`;
					settotofrom = 1;
					//alert( 'SELLETH: ' + result.description);
                    break;
            }
            break;
        case "ethadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τETH transfer";
                    result.description = `Transfer ${tx.EV_Value} τETH from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τETH)`;
                    break;
                case "ImportCrypto":
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τETH import";
                    result.description = `Import ${tx.EV_Value} τETH to ${tx.EV_To} (fee: ${tx.EV_Fee} τETH)`;
					setfromtoto = 1;
                    break;
                case "ExportCrypto":
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τETH export";
                    result.description = `Export ${tx.EV_Value} τETH from ${tx.EV_From} (fee: ${tx.EV_Fee} τETH)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τETH TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τETH (fee: ${tx.EV_Fee} τETH)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τETH exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τETH (fee: ${tx.EV_Fee} τETH)`;
					setfromtoto = 1;
                    break;
                case "DepositCrypto":
                    result.type = "τETH deposit";
                    result.description = `Deposit ${tx.EV_Value} τETH to ${tx.EV_To} (fee: ${tx.EV_Fee} τETH)`;
					setfromtoto = 1;
                    break;
                case "AdminWithdrawCrypto":
                    result.type = "τETH withdrawal";
                    result.description = `Withdraw ${tx.EV_Value} τETH from ${tx.EV_From} (fee: ${tx.EV_Fee} τETH)`;
					settotofrom = 1;
                    break;
            }
            break;
        case "ethsuperadminContract":
            switch (tx.EV_Event) {
                case "ImportCrypto":
                case "ImportReserve":
                    result.type = "τETH import reserve";
                    result.description = `Import ${tx.EV_Value} τETH to τETH reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportCrypto":
                case "ExportReserve":
                    result.type = "τETH export reserve";
                    result.description = `Export ${tx.EV_Value} τETH from τETH reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τETH transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τETH from τETH reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τETH transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τETH from ${tx.EV_From} to τETH reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τETH TORO reserve exchange";
                    result.description = `Convert ${tx.EV_Value} τETH from τETH reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τETH reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τETH in τETH reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
    }
    result.time = dateoutput(tx.EV_Time);

	//set the null tos to the froms
	if (settotofrom == 1) result.to_trunc = result.from_trunc;
	if (settotofrom == 1) result.to_trunc2 = result.from_trunc2;
	if (settotofrom == 1) result.to = result.from;

	//set the null froms to the tos
	if (setfromtoto == 1) result.from_trunc = result.to_trunc;
	if (setfromtoto == 1) result.from_trunc2 = result.to_trunc2;
	if (setfromtoto == 1) result.from = result.to;

	//if (result.type == "τETH TORO exchange") alert(result.description);
    return result;
}

function processTxDataItemAddress(tx, addr) {
    var result = {};
    result.hash = tx.EV_Hash;
    result.hash_trunc = result.hash.substring(0,4)  + '...' + result.hash.substring(result.hash.length-5);
    result.hash_trunc2 = result.hash.substring(0,6)  + '...' + result.hash.substring(result.hash.length-7);
    result.contract = tx.EV_Contract; //Use
    result.type = tx.EV_Event;
    result.from = tx.EV_From;
	//console.log('current address:' + addr + ':');
	//console.log('fee address:' + tx.EV_FeeAddress + ':');
	//console.log('commission address:' + tx.EV_CommissionAddress + ':');
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
	
    result.value = tx.EV_Value;
    result.value2 = tx.EV_Value2;
    result.fee = tx.EV_Fee;
	
	var setfromtoto = 0;
	var settotofrom = 0;
		
    switch (tx.EV_Contract) {
        case "toroerc20Contract":
        case "toroclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "TORO transfer";
                    result.description = `Transfer ${tx.EV_Value} TORO from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} TORO)`;
                    break;
            }
            break;
        case "toroadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "TORO transfer";
                    result.description = `Transfer ${tx.EV_Value} TORO from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} TORO)`;
                    break;
                case "Mint":
                    result.type = "TORO mint";
                    result.description = `Mint ${tx.EV_Value} TORO to ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "Burn":
                    result.type = "TORO burn";
                    result.description = `Burn ${tx.EV_Value} TORO from ${tx.EV_From}`;
                    break;
            }
            break;
        case "torosuperadminContract":
            switch (tx.EV_Event) {
                case "MintReserve":
                    result.type = "TORO mint reserve";
                    result.description = `Mint ${tx.EV_Value} TORO to TORO reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "BurnReserve":
                    result.type = "TORO burn reserve";
                    result.description = `Burn ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From}`;
                    break;
                case "TransferFromReserve":
                    result.type = "TORO transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "TORO transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} TORO from ${tx.EV_From} to TORO reserve ${tx.EV_To}`;
                    break;
            }
            break;
        case "dollarerc20Contract":
        case "dollarclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τUSD transfer";
                    result.description = `Transfer ${tx.EV_Value} τUSD from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τUSD)`;
                    break;
                case "BuyToro":
                    result.type = "τUSD TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τUSD (fee: ${tx.EV_Fee} τUSD)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO τUSD exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τUSD (fee: ${tx.EV_Fee} τUSD)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "dollaradminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τUSD transfer";
                    result.description = `Transfer ${tx.EV_Value} τUSD from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τUSD)`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τUSD deposit";
                    result.description = `Import ${tx.EV_Value} τUSD to ${tx.EV_To} (fee: ${tx.EV_Fee} τUSD)`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τUSD withdrawal";
                    result.description = `Export ${tx.EV_Value} τUSD from ${tx.EV_From} (fee: ${tx.EV_Fee} τUSD)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τUSD TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τUSD (fee: ${tx.EV_Fee} τUSD)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τUSD exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τUSD (fee: ${tx.EV_Fee} τUSD)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "dollarsuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τUSD deposit reserve";
                    result.description = `Import ${tx.EV_Value} τUSD to τUSD reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τUSD withdrawal reserve";
                    result.description = `Export ${tx.EV_Value} τUSD from τUSD reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τUSD transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τUSD from τUSD reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τUSD transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τUSD from ${tx.EV_From} to τUSD reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τUSD reserve TORO exchange";
                    result.description = `Convert ${tx.EV_Value} τUSD from τUSD reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τUSD reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τUSD in τUSD reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "nairaerc20Contract":
        case "nairaclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τNGN transfer";
                    result.description = `Transfer ${tx.EV_Value} τNGN from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τNGN)`;
                    break;
                case "BuyToro":
                    result.type = "τNGN TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τNGN (fee: ${tx.EV_Fee} τNGN)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO τNGN exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τNGN (fee: ${tx.EV_Fee} τNGN)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "nairaadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τNGN transfer";
                    result.description = `Transfer ${tx.EV_Value} τNGN from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τNGN)`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τNGN deposit";
                    result.description = `Import ${tx.EV_Value} τNGN to ${tx.EV_To} (fee: ${tx.EV_Fee} τNGN)`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τNGN withdrawal";
                    result.description = `Export ${tx.EV_Value} τNGN from ${tx.EV_From} (fee: ${tx.EV_Fee} τNGN)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τNGN TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τNGN (fee: ${tx.EV_Fee} τNGN)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τNGN exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τNGN (fee: ${tx.EV_Fee} τNGN)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "nairasuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τNGN deposit reserve";
                    result.description = `Import ${tx.EV_Value} τNGN to τNGN reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τNGN withdrawal reserve";
                    result.description = `Export ${tx.EV_Value} τNGN from τNGN reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τNGN transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τNGN from τNGN reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τNGN transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τNGN from ${tx.EV_From} to τNGN reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τNGN reserve TORO exchange";
                    result.description = `Convert ${tx.EV_Value} τNGN from τNGN reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τNGN reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τNGN in τNGN reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "euroerc20Contract":
        case "euroclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τEUR transfer";
                    result.description = `Transfer ${tx.EV_Value} τEUR from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τEUR)`;
                    break;
                case "BuyToro":
                    result.type = "τEUR TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τEUR (fee: ${tx.EV_Fee} τEUR)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO τEUR exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τEUR (fee: ${tx.EV_Fee} τEUR)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "euroadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τEUR transfer";
                    result.description = `Transfer ${tx.EV_Value} τEUR from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τEUR)`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τEUR deposit";
                    result.description = `Import ${tx.EV_Value} τEUR to ${tx.EV_To} (fee: ${tx.EV_Fee} τEUR)`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τEUR withdrawal";
                    result.description = `Export ${tx.EV_Value} τEUR from ${tx.EV_From} (fee: ${tx.EV_Fee} τEUR)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τEUR TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τEUR (fee: ${tx.EV_Fee} τEUR)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τEUR exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τEUR (fee: ${tx.EV_Fee} τEUR)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "eurosuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τEUR deposit reserve";
                    result.description = `Import ${tx.EV_Value} τEUR to τEUR reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τEUR withdrawal reserve";
                    result.description = `Export ${tx.EV_Value} τEUR from τEUR reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τEUR transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τEUR from τEUR reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τEUR transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τEUR from ${tx.EV_From} to τEUR reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τEUR reserve TORO exchange";
                    result.description = `Convert ${tx.EV_Value} τEUR from τEUR reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τEUR reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τEUR in τEUR reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "pounderc20Contract":
        case "poundclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τGBP transfer";
                    result.description = `Transfer ${tx.EV_Value} τGBP from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τGBP)`;
                    break;
                case "BuyToro":
                    result.type = "τGBP TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τGBP (fee: ${tx.EV_Fee} τGBP)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO τGBP exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τGBP (fee: ${tx.EV_Fee} τGBP)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "poundadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τGBP transfer";
                    result.description = `Transfer ${tx.EV_Value} τGBP from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τGBP)`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τGBP deposit";
                    result.description = `Import ${tx.EV_Value} τGBP to ${tx.EV_To} (fee: ${tx.EV_Fee} τGBP)`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τGBP withdrawal";
                    result.description = `Export ${tx.EV_Value} τGBP from ${tx.EV_From} (fee: ${tx.EV_Fee} τGBP)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τGBP TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τGBP (fee: ${tx.EV_Fee} τGBP)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τGBP exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τGBP (fee: ${tx.EV_Fee} τGBP)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "poundsuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τGBP deposit reserve";
                    result.description = `Import ${tx.EV_Value} τGBP to τGBP reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τGBP withdrawal reserve";
                    result.description = `Export ${tx.EV_Value} τGBP from τGBP reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τGBP transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τGBP from τGBP reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τGBP transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τGBP from ${tx.EV_From} to τGBP reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τGBP reserve TORO exchange";
                    result.description = `Convert ${tx.EV_Value} τGBP from τGBP reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τGBP reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τGBP in τGBP reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "egperc20Contract":
        case "egpclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τEGP transfer";
                    result.description = `Transfer ${tx.EV_Value} τEGP from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τEGP)`;
                    break;
                case "BuyToro":
                    result.type = "τEGP TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τEGP (fee: ${tx.EV_Fee} τEGP)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO τEGP exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τEGP (fee: ${tx.EV_Fee} τEGP)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "egpadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τEGP transfer";
                    result.description = `Transfer ${tx.EV_Value} τEGP from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τEGP)`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τEGP deposit";
                    result.description = `Import ${tx.EV_Value} τEGP to ${tx.EV_To} (fee: ${tx.EV_Fee} τEGP)`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τEGP withdrawal";
                    result.description = `Export ${tx.EV_Value} τEGP from ${tx.EV_From} (fee: ${tx.EV_Fee} τEGP)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τEGP TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τEGP (fee: ${tx.EV_Fee} τEGP)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τEGP exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τEGP (fee: ${tx.EV_Fee} τEGP)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "egpsuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τEGP deposit reserve";
                    result.description = `Import ${tx.EV_Value} τEGP to τEGP reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τEGP withdrawal reserve";
                    result.description = `Export ${tx.EV_Value} τEGP from τEGP reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τEGP transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τEGP from τEGP reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τEGP transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τEGP from ${tx.EV_From} to τEGP reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τEGP reserve TORO exchange";
                    result.description = `Convert ${tx.EV_Value} τEGP from τEGP reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τEGP reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τEGP in τEGP reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "ksherc20Contract":
        case "kshclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τKSH transfer";
                    result.description = `Transfer ${tx.EV_Value} τKSH from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τKSH)`;
                    break;
                case "BuyToro":
                    result.type = "τKSH TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τKSH (fee: ${tx.EV_Fee} τKSH)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO τKSH exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τKSH (fee: ${tx.EV_Fee} τKSH)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "kshadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τKSH transfer";
                    result.description = `Transfer ${tx.EV_Value} τKSH from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τKSH)`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τKSH deposit";
                    result.description = `Import ${tx.EV_Value} τKSH to ${tx.EV_To} (fee: ${tx.EV_Fee} τKSH)`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τKSH withdrawal";
                    result.description = `Export ${tx.EV_Value} τKSH from ${tx.EV_From} (fee: ${tx.EV_Fee} τKSH)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τKSH TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τKSH (fee: ${tx.EV_Fee} τKSH)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τKSH exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τKSH (fee: ${tx.EV_Fee} τKSH)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "kshsuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τKSH deposit reserve";
                    result.description = `Import ${tx.EV_Value} τKSH to τKSH reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τKSH withdrawal reserve";
                    result.description = `Export ${tx.EV_Value} τKSH from τKSH reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τKSH transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τKSH from τKSH reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τKSH transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τKSH from ${tx.EV_From} to τKSH reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τKSH reserve TORO exchange";
                    result.description = `Convert ${tx.EV_Value} τKSH from τKSH reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τKSH reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τKSH in τKSH reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "zarerc20Contract":
        case "zarclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "τZAR transfer";
                    result.description = `Transfer ${tx.EV_Value} τZAR from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τZAR)`;
                    break;
                case "BuyToro":
                    result.type = "τZAR TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τZAR (fee: ${tx.EV_Fee} τZAR)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO τZAR exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τZAR (fee: ${tx.EV_Fee} τZAR)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "zaradminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τZAR transfer";
                    result.description = `Transfer ${tx.EV_Value} τZAR from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τZAR)`;
                    break;
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τZAR deposit";
                    result.description = `Import ${tx.EV_Value} τZAR to ${tx.EV_To} (fee: ${tx.EV_Fee} τZAR)`;
					setfromtoto = 1;
                    break;
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τZAR withdrawal";
                    result.description = `Export ${tx.EV_Value} τZAR from ${tx.EV_From} (fee: ${tx.EV_Fee} τZAR)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τZAR TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τZAR (fee: ${tx.EV_Fee} τZAR)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τZAR exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τZAR (fee: ${tx.EV_Fee} τZAR)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "zarsuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "τZAR deposit reserve";
                    result.description = `Import ${tx.EV_Value} τZAR to τZAR reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "τZAR withdrawal reserve";
                    result.description = `Export ${tx.EV_Value} τZAR from τZAR reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τZAR transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τZAR from τZAR reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τZAR transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τZAR from ${tx.EV_From} to τZAR reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τZAR reserve TORO exchange";
                    result.description = `Convert ${tx.EV_Value} τZAR from τZAR reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τZAR reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τZAR in τZAR reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "espeeserc20Contract":
        case "espeesclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "ESPS transfer";
                    result.description = `Transfer ${tx.EV_Value} ESPS from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} ESPS)`;
                    break;
                case "BuyToro":
                    result.type = "ESPS TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} ESPS (fee: ${tx.EV_Fee} ESPS)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO ESPS exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} ESPS (fee: ${tx.EV_Fee} ESPS)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "espeesadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "ESPS transfer";
                    result.description = `Transfer ${tx.EV_Value} ESPS from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} ESPS)`;
                    break;
                case "ImportCoin":
                case "ImportCoinWithCustomFee":
                    result.type = "ESPS import";
                    result.description = `Import ${tx.EV_Value} ESPS to ${tx.EV_To} (fee: ${tx.EV_Fee} ESPS)`;
					setfromtoto = 1;
                    break;
                case "ExportCoin":
                case "ExportCoinWithCustomFee":
                    result.type = "ESPS export";
                    result.description = `Export ${tx.EV_Value} ESPS from ${tx.EV_From} (fee: ${tx.EV_Fee} ESPS)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "TORO ESPS exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} ESPS (fee: ${tx.EV_Fee} ESPS)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO ESPS exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} ESPS (fee: ${tx.EV_Fee} ESPS)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "espeessuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "ESPS import reserve";
                    result.description = `Import ${tx.EV_Value} ESPS to ESPS reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "ESPS export reserve";
                    result.description = `Export ${tx.EV_Value} ESPS from ESPS reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "ESPS transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} ESPS from ESPS reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "ESPS transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} ESPS from ${tx.EV_From} to ESPS reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "ESPS TORO reserve exchange";
                    result.description = `Convert ${tx.EV_Value} ESPS from ESPS reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO ESPS reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} ESPS in ESPS reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
		//-----------------------------------------------------------------
		//Plast
		case "plasterc20Contract":
        case "plastclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                case "Transfer2":
                    result.type = "PLAST transfer";
                    result.description = `Transfer ${tx.EV_Value} PLAST from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} PLAST)`;
                    break;
                case "BuyToro":
                    result.type = "PLAST TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} PLAST (fee: ${tx.EV_Fee} PLAST)`;
					settotofrom = 1;
                    break;
                case "SellToro":
                    result.type = "TORO PLAST exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} PLAST (fee: ${tx.EV_Fee} PLAST)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "plastadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "PLAST transfer";
                    result.description = `Transfer ${tx.EV_Value} PLAST from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} PLAST)`;
                    break;
                case "ImportCoin":
                case "ImportCoinWithCustomFee":
                    result.type = "PLAST import";
                    result.description = `Import ${tx.EV_Value} PLAST to ${tx.EV_To} (fee: ${tx.EV_Fee} PLAST)`;
					setfromtoto = 1;
                    break;
                case "ExportCoin":
                case "ExportCoinWithCustomFee":
                    result.type = "PLAST export";
                    result.description = `Export ${tx.EV_Value} PLAST from ${tx.EV_From} (fee: ${tx.EV_Fee} PLAST)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "TORO PLAST exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} PLAST (fee: ${tx.EV_Fee} PLAST)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO PLAST exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} PLAST (fee: ${tx.EV_Fee} PLAST)`;
					setfromtoto = 1;
                    break;
            }
            break;
        case "plastsuperadminContract":
            switch (tx.EV_Event) {
                case "ImportReserve":
                    result.type = "PLAST import reserve";
                    result.description = `Import ${tx.EV_Value} PLAST to PLAST reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportReserve":
                    result.type = "PLAST export reserve";
                    result.description = `Export ${tx.EV_Value} PLAST from PLAST reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "PLAST transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} PLAST from PLAST reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "PLAST transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} PLAST from ${tx.EV_From} to PLAST reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "PLAST TORO reserve exchange";
                    result.description = `Convert ${tx.EV_Value} PLAST from PLAST reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO PLAST reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} PLAST in PLAST reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;

		//-----------------------------------------------------------------
        case "etherc20Contract":
        case "ethclientContract":
            switch (tx.EV_Event) {
                case "Transfer":
                    result.type = "τETH transfer";
                    result.description = `Transfer ${tx.EV_Value} τETH from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τETH)`;
                    break;
                case "BuyToro":
                    result.type = "τETH TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τETH (fee: ${tx.EV_Fee} τETH)`;
					settotofrom = 1;
					//alert( 'BUYETH: ' + result.description);
                    break;
                case "SellToro":
                    result.type = "TORO τETH exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τETH (fee: ${tx.EV_Fee} τETH)`;
					setfromtoto = 1;
                    break;
                case "WithdrawCrypto":
                    result.type = "τETH withdrawal";
                    result.description = `Withdraw ${tx.EV_Value} τETH from ${tx.EV_From} (fee: ${tx.EV_Fee} τETH)`;
					settotofrom = 1;
					//alert( 'SELLETH: ' + result.description);
                    break;
            }
            break;
        case "ethadminContract":
            switch (tx.EV_Event) {
                case "AdminTransfer":
                case "AdminTransferWithCustomFee":
                    result.type = "τETH transfer";
                    result.description = `Transfer ${tx.EV_Value} τETH from ${tx.EV_From} to ${tx.EV_To} (fee: ${tx.EV_Fee} τETH)`;
                    break;
                case "ImportCrypto":
                case "ImportCurrency":
                case "ImportCurrencyWithCustomFee":
                    result.type = "τETH import";
                    result.description = `Import ${tx.EV_Value} τETH to ${tx.EV_To} (fee: ${tx.EV_Fee} τETH)`;
					setfromtoto = 1;
                    break;
                case "ExportCrypto":
                case "ExportCurrency":
                case "ExportCurrencyWithCustomFee":
                    result.type = "τETH export";
                    result.description = `Export ${tx.EV_Value} τETH from ${tx.EV_From} (fee: ${tx.EV_Fee} τETH)`;
					settotofrom = 1;
                    break;
                case "AdminBuyToro":
                case "AdminBuyToroWithCustomFee":
                case "AdminBuyTororWithCustomFee":
                    result.type = "τETH TORO exchange";
                    result.description = `${tx.EV_From} exchange ${tx.EV_Value2} TORO with ${tx.EV_Value} τETH (fee: ${tx.EV_Fee} τETH)`;
					settotofrom = 1;
                    break;
                case "AdminSellToro":
                case "AdminSellToroWithCustomFee":
                    result.type = "TORO τETH exchange";
                    result.description = `${tx.EV_To} exchange ${tx.EV_Value} TORO for ${tx.EV_Value2} τETH (fee: ${tx.EV_Fee} τETH)`;
					setfromtoto = 1;
                    break;
                case "DepositCrypto":
                    result.type = "τETH deposit";
                    result.description = `Deposit ${tx.EV_Value} τETH to ${tx.EV_To} (fee: ${tx.EV_Fee} τETH)`;
					setfromtoto = 1;
                    break;
                case "AdminWithdrawCrypto":
                    result.type = "τETH withdrawal";
                    result.description = `Withdraw ${tx.EV_Value} τETH from ${tx.EV_From} (fee: ${tx.EV_Fee} τETH)`;
					settotofrom = 1;
                    break;
            }
            break;
        case "ethsuperadminContract":
            switch (tx.EV_Event) {
                case "ImportCrypto":
                case "ImportReserve":
                    result.type = "τETH import reserve";
                    result.description = `Import ${tx.EV_Value} τETH to τETH reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
                case "ExportCrypto":
                case "ExportReserve":
                    result.type = "τETH export reserve";
                    result.description = `Export ${tx.EV_Value} τETH from τETH reserve ${tx.EV_From}`;
					settotofrom = 1;
                    break;
                case "TransferFromReserve":
                    result.type = "τETH transfer from reserve";
                    result.description = `Transfer ${tx.EV_Value} τETH from τETH reserve ${tx.EV_From} to ${tx.EV_To}`;
                    break;
                case "TransferToReserve":
                    result.type = "τETH transfer to reserve";
                    result.description = `Transfer ${tx.EV_Value} τETH from ${tx.EV_From} to τETH reserve ${tx.EV_To}`;
                    break;
                case "ReserveBuyToro":
                    result.type = "τETH TORO reserve exchange";
                    result.description = `Convert ${tx.EV_Value} τETH from τETH reserve ${tx.EV_From} to ${tx.EV_Value2} TORO in TORO reserve ${tx.EV_To}`;
					settotofrom = 1;
                    break;
                case "ReserveSellToro":
                    result.type = "TORO τETH reserve exchange";
                    result.description = `Convert ${tx.EV_Value} TORO from TORO reserve ${tx.EV_From} to ${tx.EV_Value2} τETH in τETH reserve ${tx.EV_To}`;
					setfromtoto = 1;
                    break;
            }
            break;
    }
    result.time = dateoutput(tx.EV_Time);

	//set the null tos to the froms
	if (settotofrom == 1) result.to_trunc = result.from_trunc;
	if (settotofrom == 1) result.to_trunc2 = result.from_trunc2;
	if (settotofrom == 1) result.to = result.from;

	//set the null froms to the tos
	if (setfromtoto == 1) result.from_trunc = result.to_trunc;
	if (setfromtoto == 1) result.from_trunc2 = result.to_trunc2;
	if (setfromtoto == 1) result.from = result.to;

	//Jun 18 2023. Add fee transactions to fee addresses
	if (tx.EV_CommissionAddress == addr) 
	{
		var commissionvalue = tx.EV_Commission*tx.EV_Fee
		result.description = `Fee Portion: ` + commissionvalue.toString() + ` of ` + result.description;
		result.value = commissionvalue;
		//console.log('commission value:' + commissionvalue.toString() + '');
		//console.log(result.description);
	}
	if (tx.EV_FeeAddress == addr) 
	{
		var feevalue = (1.0 - tx.EV_Commission)*tx.EV_Fee
		result.description = `Fee Portion: ` + feevalue.toString() + ` of ` + result.description;
		result.value = feevalue;
		//console.log('fee value:' + feevalue.toString() + '');
		//console.log(result.description);
	}
	//if (result.type == "τETH TORO exchange") alert(result.description);
    return result;
}


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
