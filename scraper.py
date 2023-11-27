from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager 
import time

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
login_CSP('', '')
time.sleep(15)
subject = browser.find_elements(by=By.TAG_NAME, value="Option")
subject[7].click()
dropdown = browser.find_elements(by=By.TAG_NAME, value="Option")
del dropdown[:8]
time.sleep(1)
# The Subjects dropdown[0] is accounting. You would put this in a for loop to go through all of them when the time comes
dropdown[1].click()
time.sleep(1)
search = browser.find_element(by=By.ID, value='dojox_form_BusyButton_0')
search.click()
time.sleep(1)
i = 0
try:
    while True:
        course = browser.find_element(by=By.ID, value='csp_view_schedulebuilder_CourseSelect_Course_' + str(i))
        course.click()
        sections = browser.find_elements(by=By.TAG_NAME, value = 'tr')
        i+=1
        
        for j in sections:
            if '\n' in j.text:
                info = j.text.split('\n')
                for h in info:
                    if 'Section' not in h:
                        if len(h) > 0:
                            print(h + "\t" + str(len(h)))
                print('\n')

except:
    print("done")
course.click()
time.sleep(30)