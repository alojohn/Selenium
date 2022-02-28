const {Builder,By,Key , util,TimeUnit,until} = require("selenium-webdriver");
const assert = require("assert");
const credentials = [
    {TestNumber:"LP-0002",Username:"",Password:"",result:"Please fill out Username and Password."},
    {TestNumber:"LP-0003",Username:"aljohnmotas1@gmail.com",Password:"",result:"Please fill out Username and Password.",},
    {TestNumber:"LP-0004",Username:"",Password:"Master5lpass",result:"Please fill out Username and Password."},
    {TestNumber:"LP-0005",Username:"aljohnmotas1",Password:"Master5lpass",result:"User does not exist."},
    {TestNumber:"LP-0006",Username:"aljohnmotas1@gmail.com",Password:"Master5lpassss",result:"Wrong password."},
];


async function Login({count}){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get(" https://www.demoblaze.com/index.html");
    await driver.findElement(By.id("login2")).click();
    await driver.findElement(By.id("loginusername")).sendKeys(credentials[count].Username);
    await driver.findElement(By.id("loginpassword")).sendKeys(credentials[count].Password);
    await driver.findElement(By.xpath("//button[contains(@class,'btn btn-primary') and contains(@onclick,'logIn')]")).click();

    await driver.wait(until.alertIsPresent());
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();

    //await alert.accept();
    assert.equal(alertText,credentials[count].result)
    console.log(credentials[count].TestNumber,"alert");
    await driver.quit();
  
}
async function loginTest(){
    await Login({count:0});
    await Login({count:1});
    await Login({count:2});
    await Login({count:3});
    await Login({count:4});
}
loginTest();