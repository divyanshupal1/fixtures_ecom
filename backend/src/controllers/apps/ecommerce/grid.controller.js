import { GridImage } from '../../../models/apps/ecommerce/grid.models'; // Ensure this path matches your file structure

// Create a new Grid
export async function createGrid(req, res) {
  try {
    const grid = new GridImage(req.body);
    await grid.save();
    res.status(201).send(grid);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

// Retrieve all Grids
export async function getAllGrids(req, res) {
  try {
    const grids = await GridImage.find();
    res.send(grids);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Retrieve a single Grid by ID
export async function getGridById(req, res) {
  try {
    const grid = await GridImage.findById(req.params.id);
    if (!grid) {
      return res.status(404).send();
    }
    res.send(grid);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Update a Grid by ID
export async function updateGrid(req, res) {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['gridName', 'leftImage', 'rightTopImage', 'rightBottomLeftImage', 'rightBottomRightImage'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const grid = await GridImage.findById(req.params.id);
    if (!grid) {
      return res.status(404).send();
    }

    updates.forEach(update => grid[update] = req.body[update]);
    await grid.save();
    res.send(grid);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

// Delete a Grid by ID
export async function deleteGrid(req, res) {
  try {
    const grid = await GridImage.findByIdAndDelete(req.params.id);
    if (!grid) {
      return res.status(404).send();
    }
    res.send(grid);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
