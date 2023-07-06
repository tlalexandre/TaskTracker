# Task Tracker

Task Tracker is a website that allows you to get a better management of the differents tasks, for professionals or private usage. It's built using Javascript, HTML & CSS. This website is fully responsive, it allows users to create their own categories, their own tasks, and to mark them as complete or delete them.

![Responsive](./readme/TaskTrackerResponsive.png)

-Live Website:https://tlalexandre.github.io/TaskTracker/

## Features 

### Existing Features

- __The Task Tracker Logo and Heading__
- Featured at the top of the page, the Task Tracker Logo and Heading is easy to see for the user. Upon viewing the page, the user will be able to see the name of the website, and understand its purpose by seeing the Logo. It also contains simple instructions on how to use the website. 
-By clicking on the Get Started button, the user is redirected on the Category and Task Area. 

![Logo]((./readme/TaskTrackerHeading.png)

- __The Category Area__
  
    -__Category Creation__
        -This area will allow the user to create categories. The user will be able to easily see the icon to create a new category, and a subtitle is provided to guide the user.
        -The user will be able to personalise the name of his category, by entering the name wanted in the input when he creates a new category.

    ![CategoryCreation](./readme/CategoryCreation.png)

    -__Category Completion__
        -By double clicking on the category, the user can delete a category. This will delete all the tasks inside the category as well. 
        -The user have to confirm the deletion of the category by clicking on the Confirm button, to avoid any missclick.
        -If the user clicks on the Cancel button, then the original title is displayed again. 

    ![CategoryDeletion](./readme/CategoryDeletion.png)


- __The Task Section__
  
    -__Task Creation__
        -This area allow the user to create personalised tasks inside each category. The user will be able to easily create tasks by clicking on the New Task button.

    ![TaskCreation](./readme/TaskCreation.png)

    -__Task Completion__
        -By clicking a single time on the tasks, the user will be able to tell that a task has been completed as the background of the task will turn green. 

    ![TaskCompletion](./readme/TaskCompletion.png)

    -__Task Deletion__
        -By double clicking on the task, the user can delete it. To avoid any click error, the user will have to confirm the deletion by clicking on the "V" button, or the "X" one to restore the task as it was. 

    ![TaskDeletion](./readme/TaskDeletion.png)



- __Data Storage__

    -__How is the Data saved?__
        -To save the different categories and tasks created by the user, I used the local storage of the browser.
        -Whenever a new category or task is created, its data is added in the local storage, in an array. 
        -Whenever the user deletes a category or a task, the data is removed from the array they belong to.
        -On every action, the data is saved, this allows the user to have a dynamic website.
        -One array contains a list of the differents categories, and each task is in an array that belongs to the category where the task has been created.
        
    -__How is the Data loaded?__
        -When you open the website, the data in the local storage will be retrieve and the program will run through the differents arrays to display the correct information. 

    ![LocalStorage](./readme/LocalStorage.png)

### Features Left to Implement

- In the future, a great feature to add would be an agenda that would sort the differents tasks through the days of the month, regardless of their categories.
-For this feature to be implemented, I would need to add an input for the hour on top of the one for the date. 
-I would also need an algorithm that would sort the tasks chronologically. 

## Testing 

I have tested the website on differents browsers: Chrome, Opera and Mozilla Firefox.
I checked the responsive of the website on differents devices, a desktop computer, a Google Pixel 6 and an Ipad Mini

### Validator Testing 

- HTML
    - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Ftlalexandre.github.io%2FTaskTracker%2F)
- CSS
    - No errors were found when passing through the official [(Jigsaw) validator](http://jigsaw.w3.org/css-validator/validator?lang=en&profile=css3svg&uri=https%3A%2F%2Ftlalexandre.github.io%2FTaskTracker%2F&usermedium=all&vextwarning=&warning=1)
- JavaScript
    - No errors were found when passing through the official [Jshint validator](https://jshint.com/)
      - The following metrics were returned: 
      - There are 33 functions in this file.
      - Function with the largest signature takes 2 arguments, while the median is 1.
      - Largest function has 19 statements in it, while the median is 3.
      - The most complex function has a cyclomatic complexity value of 6 while the median is 1.

### Unfixed Bugs

- During the development,I encountered several bugs . Here's a non exhaustive list of them:
    -In the Chrome Developer Tools , when displaying the website on mobile device to test responsiveness, the blur on the background of the categories get applied to the whole category. This issue seems to be existing only in the Developer Tools, and has not been detected on real mobile devices.
    -The double click to delete a task or a category in the Developer Tools on mobile device doesn't seem to work either, however, it works on real mobile devices.
    -Once you enter in the deletion menu and exit it with the Cancel Button, you don't seem to be able to put it back as done. The only fix to that issue is to reload the page which allows you to say the task is done again. 

## Deployment

- The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the GitHub repository, navigate to the Settings tab 
  - From the source section drop-down menu, select the Master Branch
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment. 

The live link can be found here - https://tlalexandre.github.io/TaskTracker/


## Credits 

I've used Chat GPT to help me during the development of this website, mainly on the date suffix function that allows me to get the correct suffix for each date of the month. 

### Content 

- The icons in the footer were taken from [Font Awesome](https://fontawesome.com/)

### Media

- The photos used on the home and sign up page are from Unsplash, an open source photos website. 
