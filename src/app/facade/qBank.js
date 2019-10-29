export const fetchQuestions = function () {
    fetch('http://localhost:7200/qbank/fetchq', { type: "cors" }).then(function (response) {
        if (!response.ok)
            return response.statusText;

        return response.json();

    }
    );

};



