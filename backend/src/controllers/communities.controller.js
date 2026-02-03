import * as communityService from "../services/communities.service.js";

export const getCommunities = async (req, res, next) => {
  try {
    const communities = await communityService.getCommunities();
    res.json(communities);
  } catch (error) {
    next(error);
  }
};

export const getCommunity = async (req, res, next) => {
  try {
    const community = await communityService.getCommunity(req.params.id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    res.json(community);
  } catch (error) {
    next(error);
  }
};

export const createCommunity = async (req, res, next) => {
  try {
    const newCommunity = await communityService.createCommunity(req.body);
    res.status(201).json(newCommunity);
  } catch (error) {
    next(error);
  }
};

export const updateCommunity = async (req, res, next) => {
  try {
    const updatedCommunity = await communityService.updateCommunity(
      req.params.id,
      req.body
    );
    if (!updatedCommunity) {
      return res.status(404).json({ message: "Community not found" });
    }
    res.json(updatedCommunity);
  } catch (error) {
    next(error);
  }
};

export const deleteCommunity = async (req, res, next) => {
  try {
    const deletedCommunity = await communityService.deleteCommunity(req.params.id);
    if (!deletedCommunity) {
      return res.status(404).json({ message: "Community not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
