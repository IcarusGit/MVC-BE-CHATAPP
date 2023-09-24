# MVC-BE-CHATAPP
ung .find() ng mongoDB
it returns a promise 
ngayon using an asycn function we can handle a promise na by awaiting it

so instead na promise lang ibalik niya i aawait natin siya para ibalik niya yung pinaka hinihintay natin na data

so ang output imbis na <promise> magiging yung data na ineexpect naten kahit array man yan o object

An async function handles a promise by awaiting it. This means that the function will not return until the promise has resolved.

#======================================

REFRESH TOKEN ---- NILALAGAY SA COOKIES -> para siyang yung token na sinesave kosa localstorage dito sa project na to
tapos kapag nag jwt.sign ka at walang expiration, forever siyang valid unless i blacklist ko siya at shempre alisin sa local storage or sa cookies

ACCESS TOKEN ---- eto yung nilalagay talaga dapat sa local storage, meron siyang expiration dapat kapag nag jwt.sign ka.
                  also kapag nag expire... need na may axios instance sa front end para kada http method na mangyare i chcheck yung access token
                  if expired na pero may refresh token pa... mag gegenerate lang ng new access token, 
                  if expired na and wala na ring refresh token sa cookies bale mag aauto logout nalang siya pero pag naglogout naman tanggal na rin naman refresh token
                  so alam mo na next non isip ka nalang diskarte

