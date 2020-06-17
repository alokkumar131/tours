const fs = require('fs')
let tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = (req, res)=>{
  console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data:{
      tours: tours
    }
  }) 
}
exports.getTour = (req, res)=>{
  const tour = req.params.id > (tours.length - 1) ?  res.status(404)
  .json({
    status: 'fail',
    message:'Invalid Id'
  }) : tours.filter((tour)=>{
       return tour.id === Number(req.params.id);
  })
  res.status(200).json({
    status: 'success',
    data:{
      tour: tour
    }
  }) 
}

exports.createTour = (req, res)=>{
  const newid = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({id : newid}, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err=>{
    res.json({
      status:'success',
      data:{
        tour: newTour
      }
    });
  })
}
exports.updateTour = (req, res)=>{
  if(req.params.id > tours.length){
    return res.status(404)
    .json({
      status: 'fail',
      message:'Invalid Id'
    })
  }
  res.status(200).json({
    status:'Success',
    data: 'Update tour goes here'
  })
}
exports.deleteTour =  (req,res)=>{
  if(req.params.id > tours.length){
    return res.status(404)
    .json({
      status: 'fail',
      message:'Invalid Id'
    })
  }

  res.status(204).json({
    status:'Success',
    data: null
  })
}