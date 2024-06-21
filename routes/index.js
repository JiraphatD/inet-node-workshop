var express = require("express");
var router = express.Router();

const gradeAssign = (score) => {
  if (score > 100 || score < 0) {
    throw new Error("Invalid score");
  } else if (score >= 80) {
    return { grade: "A", numGrade: 4 };
  } else if (score >= 75) {
    return { grade: "B+", numGrade: 3.5 };
  } else if (score >= 70) {
    return { grade: "B", numGrade: 3 };
  } else if (score >= 65) {
    return { grade: "C+", numGrade: 2.5 };
  } else if (score >= 60) {
    return { grade: "C", numGrade: 2 };
  } else if (score >= 55) {
    return { grade: "D+", numGrade: 1.5 };
  } else if (score >= 50) {
    return { grade: "D", numGrade: 1 };
  } else {
    return { grade: "F", numGrade: 0 };
  }
};
/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello i");
});
router.post("/", (req, res) => {
  let body = req.body;
  console.log("body: ", body);
  res.send("this is POST");
});
router.post("/grade", async (req, res) => {
  try {
    const input = req.body.input;
    // console.log("input: ", input);

    const grades = input.map((item) => {
      return {
        subject: item.subject,
        textGrade: gradeAssign(item.score).grade,
        numGrade: gradeAssign(item.score).numGrade,
      };
    });

    const onlyUse = grades.map(({ subject, textGrade }) => ({
      subject,
      textGrade,
    }));
    onlyUse.map((item) => {
      item["grade"] = item["textGrade"];
      delete item["textGrade"];
    });

    const gpa =
      grades.reduce((prev, curr) => {
        return prev + curr.numGrade;
      }, 0) / grades.length;

    res.send({
      data: {
        subject: onlyUse,
        GPA: gpa.toFixed(2),
      },
      message: "success",
    });
  } catch (err) {
    res.status(400).send("Invalid Score");
    // console.log(err);
  }
});
router.put("/", (req, res) => {
  res.send("this is PUT");
});
router.delete("/", (req, res) => {
  res.send("this is DELETE");
});
module.exports = router;
