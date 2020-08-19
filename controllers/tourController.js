const fs = require('fs')
const Tour = require('../models/toursModel');
let tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// exports.checkId = (req, res, next, val)=>{
//   console.log(val);
//   next();
// }
exports.ckeckBody = (req, res, next)=>{
    if(!req.body.name || !req.body.price){
      return res.status(404).json({
        status:'error',
        message:'missing name or price'
      })
    }
    next()
}
exports.aliasTours = (req, res, next)=>{
  req.query.limit='5';
  req.query.fields = 'duration name'
  next();
}
exports.getAllTours = async(req, res)=>{
    
    try{
      //1)Filtering
      let queryObj = {...req.query};
      const excludeParameters = ['sort','limit', 'page', 'fields'];
      excludeParameters.forEach((el)=>{
            if(queryObj.hasOwnProperty(el)){
              delete queryObj[el];
            }
      })

      //2)Advance Filtering
      //{difficulty: 'easy', duration: {$gte: '5'}}
      //{ difficulty: 'easy', duration: { gte: '5' } }
      queryObj = JSON.stringify(queryObj);
      queryObj = queryObj.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>{
            return `$${match}`
      });
      queryObj = JSON.parse(queryObj);

      
      let query = Tour.find(queryObj);

      // Sorting
      //localhost:3000/api/tours?sort=duration
      //localhost:3000/api/tours?sort=-duration
      //localhost:3000/api/tours?sort=-duration,price
      console.log(req.query)
      if(req.query.sort){
        sortQuery = req.query.sort.split(',').join(' ');
         query = query.sort(sortQuery);
      }else{
        query.sort('-createdAt');
      }

      //Limiting fields//Projecting
      //localhost:3000/api/tours?fields=duration,name
      if(req.query.fields){
        const fieldQuery = req.query.fields.split(',').join(' ');
        query=query.select(fieldQuery);
        //query.select('name duration')
      }else{
        query=query.select('-__v');
      }

      //Pagination
      //localhost:3000/api/tours?page=2&limit=10
      if(req.query.limit && req.query.page){
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 3;
        const skip = (page-1) * limit; 
        query = query.skip(skip).limit(limit);
      }else if(req.query.limit){
        const limit = req.query.limit * 1 || 10;
        console.log(limit)
        query = query.limit(limit);
      }else{
        const page = 1;
        const limit = 3;
        const skip = (page-1) * limit; 
        query = query.skip(skip).limit(limit);
      }


      const tours = await query;
      res.status(200).json({
        status:'success',
        result: tours.length,
        data:{
          tours: tours
        }
      })
    }catch(err){
      res.status(404).json({
        status:'fail',
        message:err
      })
    }

//File system access
  // console.log(req.requestTime)
  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   data:{
  //     tours: tours
  //   }
  // }) 
}
exports.getTour = async(req, res)=>{
  try{
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status:'success',
      length: tour.length,
      data:{
        tour: tour
      }
    })
  }catch(err){
    res.status(404).json({
      status:'fail',
      message: err
    })
  }

  // const tour = req.params.id > (tours.length - 1) ?  res.status(404)
  // .json({
  //   status: 'fail',
  //   message:'Invalid Id'
  // }) : tours.filter((tour)=>{
  //      return tour.id === Number(req.params.id);
  // })
  // res.status(200).json({
  //   status: 'success',
  //   data:{
  //     tour: tour
  //   }
  // }) 
}

exports.createTour = async(req, res)=>{
  //Method 1 usiing Promise
  //  ToursModel.create(req.body)
  //  .then((data)=>{
  //   res.status(201).json({
  //     status:'success',
  //     data:{
  //       tour:data
  //     }
  //   })
  //  })
  //  .catch(err=>{
  //   res.status(404).json({
  //     status:'fail',
  //     message: err
  //   })
  //  })

  // const newTours = new ToursModel(req.body);
  // newTours.save().then((data)=>{
  //     res.status(201).json({
  //     status:'success',
  //     data:{
  //       tour:data
  //     }
  //   })
  // })
  // .catch(err=>{
  //       res.status(404).json({
  //     status:'fail',
  //     message: err
  //   })
  // })
    //  ToursModel.create(req.body)
  //  .then((data)=>{
  //   res.status(201).json({
  //     status:'success',
  //     data:{
  //       tour:data
  //     }
  //   })
  //  })
  //  .catch(err=>{
  //   res.status(404).json({
  //     status:'fail',
  //     message: err
  //   })
  //  })

  //Method-1 using async await
  // try{
  //   const newTour = new ToursModel(req.body);
  //   const newData = await newTour.save();
  //   res.status(201).json({
  //     status:'success',
  //     data:{
  //       tour:newData
  //     }
  //   })
  // }catch(err){
  //   res.status(404).json({
  //     status:'fail',
  //     message: err
  //   })
  // }

  //Method-2 using async await
  try{
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status:'success',
      data:{
        tour:newTour
      }
    })
  }catch(err){
    res.status(404).json({
      status:'fail',
      message: err
    })
  }

  //Fetching Static file by fs module
  // const newid = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({id : newid}, req.body);
  // tours.push(newTour);
  // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err=>{
  //   res.json({
  //     status:'success',
  //     data:{
  //       tour: newTour
  //     }
  //   });
  // })
}
exports.updateTour = async (req, res)=>{
  try{
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new:true,
      runValidators:true
    });
    res.status(200).json({
      status:'Success',
      data: {
        tour: tour
      }
    })
  }catch(err){
    res.status(404).json({
      status:'fail',
      message:err
    })
  }
}
exports.deleteTour =  async (req,res)=>{
  try{
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: 'success',
        data:null
    })
  }
  catch(err){
    res.status(404).json({
      status:'fail',
      message:err
    })
  }

  // if(req.params.id > tours.length){
  //   return res.status(404)
  //   .json({
  //     status: 'fail',
  //     message:'Invalid Id'
  //   })
  // }

  // res.status(204).json({
  //   status:'Success',
  //   data: null
  // })
}