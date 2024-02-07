from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager 
import time
import csv

with open("data2.csv", mode="w") as csvfile:
    fieldnames = ["index", "classCode", "section", "className"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    chrome_options = Options()
    browser = webdriver.Chrome (service=Service(ChromeDriverManager().install()), options=chrome_options)

    def open_page(url: str):
        browser.get(url)

    def close_browser():
        browser.close()

    def add_input(b: By, value: str, text: str):
        field = browser.find_element(by=b, value=value)
        field.send_keys(text)
        # time.sleep(3)

    def click_button(b: By, value: str):
        button = browser.find_element(by=b, value=value)
        button.click()
        # time.sleep(3)

    def login_CSP(username: str, password: str):
        # print('hi')
        add_input(b=By.ID, value='username', text=username)
        add_input(b=By.ID, value='password', text=password)
        click_button(b=By.CLASS_NAME, value='btn-submit')


    open_page('https://sims.rutgers.edu/csp/builder.htm?semester=92023#Page_CSPSelectCourseTab')
    time.sleep(1)

    #Add login info here Username, Password
    login_CSP('vg397', 'GongCha403!')

    time.sleep(15)
    subject = browser.find_elements(by=By.TAG_NAME, value="Option")
    subject[7].click()
    dropdown = browser.find_elements(by=By.TAG_NAME, value="Option")
    del dropdown[:124]
    time.sleep(1)
    i=0
    # The Subjects dropdown[0] is accounting. You would put this in a for loop to go through all of them when the time comes
    # for major in dropdown:
    for major in dropdown:
        major.click()
        time.sleep(1.5)
        search = browser.find_element(by=By.ID, value='dojox_form_BusyButton_0')
        search.click()
        time.sleep(1.5)
        classInMajor = []
        try:
            while True:
                time.sleep(.05)
                course = browser.find_element(by=By.ID, value='csp_view_schedulebuilder_CourseSelect_Course_' + str(i))
                course.click()
                nameArr = course.text.split("   ")
                classCode = nameArr[0]
                className = nameArr[1]
                classInMajor.append(className + "@@@" + classCode)
                i+=1
        except Exception as e:
            print()
        sections = browser.find_elements(by=By.TAG_NAME, value = 'tr')
        
        classInMajorIndex = -1
        for j in sections:
            temp = j.text
            if "EXAM CODE" in temp:
                classInMajorIndex += 1
            if ("OPEN" in temp or "CLOSED" in temp) and "Section" not in temp:
                temp = temp.split("\n")[0]
                temp = temp.split(" ")[0] + " " + temp.split(" ")[2]
                dataPoint = [temp.split(" ")[1], classInMajor[classInMajorIndex].split("@@@")[1], temp.split(" ")[0], classInMajor[classInMajorIndex].split("@@@")[0]]
                print(dataPoint)
                writer.writerow({"index": dataPoint[0], "classCode": dataPoint[1], "section": dataPoint[2], "className": dataPoint[3]})
